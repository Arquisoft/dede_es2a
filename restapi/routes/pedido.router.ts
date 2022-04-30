import { match } from "assert";
import { Console } from "console";
import express, {Request,response,Response} from "express"
import { maxHeaderSize, request } from "http";
import { ObjectId } from "mongodb";

const Juguete = require("../models/Juguete");
const Pedido = require('../models/Pedido')
const Usuario = require('../models/Usuario')

export const pedidoRouter = express.Router()
pedidoRouter.use(express.json());

// import de API Geocode para calcular coordenadas de una direccion
const ApiGeocode = require('node-geocoder');
// opciones para configurar API Geocode (proveedor openstreetmap no requiere ninguna opción extra)
const opciones = { provider:'openstreetmap' };
const geocoder = ApiGeocode(opciones);


pedidoRouter.get("/", async(req:Request,res:Response)=>{
    try{
        let pedidos = await Pedido.find({}).populate('juguetes._id').populate('usuario');
        console.log(pedidos)
        res.send(pedidos);
    } catch {
        res.status(500).send("Error al listar los pedidos");
    }
});

// Dirección de instalación de la tienda
const latEmpresa:number = 43.35503;
const lonEmpresa:number = -5.85131;

/*
* Método que se encarga de calcular los gastos de envio desde la dirección de la tienda de la empresa
* hasta la dirección del usuario en sesión
* - Comprobar que existe usuario en sesión
* - Sacar la dirección del POD (inicialmente usaremos una de prueba manualmente para el usuario)
* - La de la tienda siempre será la misma, tenerla privada en el .env
* - Tener en cuenta que la api no encuentre la direccion especificada
*/
async function gastosEnvio(direccion:String): Promise<Number> {
    try{
        let gastos:number = 0; // gastos iniciales

        // le pasamos la direccion del usuario a la api para que nos devuelva los datos en formato json
        let datosDireccion = await geocoder.geocode(direccion);

        if(datosDireccion.length == 0){ // dirección no encontrada por la API
            return 0;
        }else{ // resultado obtenido por la API
            // Obtenemos las coordenadas de entre esos datos
            let latUsuario = datosDireccion[0].latitude;
            let lonUsuario = datosDireccion[0].longitude;

            gastos = haversine(latUsuario, lonUsuario);
        }
        
        return gastos; // retornamos los gastos (Number)
    } catch (error){
        throw error;
    }
}

/*
* METODOS AUXILIARES GASTOS DE ENVIO
*/
/**
 * Convierte el número pasado en grados a radianes y lo devuelve
 * @param grados
 */
function radianes(grados:number){
    return grados*Math.PI/180;
}

/**
 * Devuelve el cuadrado del numero pasado por parámetro
 * @param numero
 */
function cuadrado(numero:number){
    return Math.pow(numero, 2);
}

/**
 * Calcula el precio de gasto de envío par una dirección de usuario dada a través de la fórmula de Haversine
 * @param latUsuario 
 * @param lonUsuario 
 * @returns el precio total de gasto de envío
 */
function haversine(latUsuario:number, lonUsuario:number){
    // calculamos la distancia entre ambas direcciones
    // es necesario utilizar la formula de haversine que se encarga de calcular la distancia en km
    // entre dos direcciones expresadas en coordenadas, teniendo en cuenta el radio de la Tierra
    // 1- calcular diferencia entre coordenadas
    let diferenciaLatitudes = latEmpresa - latUsuario;
    let diferenciaLongitudes = lonEmpresa - lonUsuario;

    // 2- pasar estos valores de grados a radianes
    diferenciaLatitudes = radianes(diferenciaLatitudes);
    diferenciaLongitudes = radianes(diferenciaLongitudes);

    // 3- mitad del cuadrado de la distancia en linea recta entre los dos puntos
    let a = cuadrado(Math.sin(diferenciaLatitudes/2)) + Math.cos(radianes(latEmpresa))*
            Math.cos(radianes(latUsuario)) * cuadrado(Math.sin(diferenciaLongitudes/2));

    // 4- distancia del angulo en radianes
    let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    // 5- la distancia en km viene dado por el radio de la Tierra multiplicado por 'c'
    const radioTierra = 6378;
    let distanciaKm = radioTierra*c;
    // precio por km establecido en nuestra empresa
    let precioKm = 0.1;

    // calculamos el precio final y lo retornamos
    return precioKm * distanciaKm;
}

pedidoRouter.post('/gastosEnvio', async (req:Request,res:Response) =>{
    try{
        // llamar a la funcion gastos de envio y retornar como respuesta el dinero calculado
        let gastos = await gastosEnvio(req.body.direccion);
        if(gastos == 0){
            res.send("0"); // Gastos de envio por defecto en caso de que la api no encuentre la dirección
        }
        res.send(gastos.toString());
    } catch (error) {
        res.status(400).json();
    }
});


/*
pedidoRouter.get("/:_id", async(req:Request,res:Response)=>{
    try{
        var pedido = await PedidoRepository.findPedido({"_id":req.params._id});
        if(pedido){
            res.send(pedido);
        } else{
            res.send("El pedido no existe");
        }
    } catch (error){
        res.send("Error al encontrar el pedido");
    }
});
*/

pedidoRouter.get("/byUser/:user", async(req:Request,res:Response)=>{
    try{
        var usuario = await Usuario.findOne({"email":req.params.user,"isAdmin":false});
        if(!usuario){
            res.send("El usuario no existe");
        }
        else{
            var pedidos = await Pedido.find({"usuario":usuario._id});
            if(pedidos.length > 0){
                res.send(pedidos);
            }else{
                res.send("No tiene pedidos");
            }
        }
    } catch(error){
        res.status(500).send(error);
    }
})

async function procesarJuguetes(juguetes:any): Promise<any> {
    try{
        let productos = [];
        for(var producto of juguetes){
            let juguete = await Juguete.findOne({nombre:producto.nombre});
            if(juguete){
                var cantidad = producto.cantidad;
                if(juguete.stock != 0){
                    if(juguete.stock < producto.cantidad){
                        cantidad = juguete.stock
                    }
                    var nuevoStock = juguete.stock - cantidad;
                    Juguete.findOneAndUpdate({"_id":new ObjectId(producto._id)},{stock:nuevoStock},{ new:true});
                    var nuevoProducto = {
                        _id:juguete._id,
                        cantidad:cantidad
                    }
                    productos.push(nuevoProducto)
                }
            }
            else{
                return null;
            }
        }
        return productos;
    } catch (error){
        throw error;
    }
    
}


pedidoRouter.post("/", async (req:Request,res:Response) =>{
    try{
        let productos = await procesarJuguetes(req.body.productos);
        if(productos.length == 0){
            res.send("No se pudo crear el pedido por falta de stock");
        }
        else{
            var user = await Usuario.findOne({"email":req.body.usuario});
            if(!user){
                res.status(500).send("El usuario no existe");
            }
            else{
                let nuevoPedido = {
                    precioSinIva: req.body.precioSinIva,
                    precioGastosDeEnvio: req.body.precioGastosDeEnvio,
                    precioFinal: req.body.precioSinIva + req.body.precioGastosDeEnvio,
                    juguetes: productos,
                    usuario:user._id
                }
                let pedido = new Pedido(nuevoPedido);
                var error = pedido.validateSync();
                if(error){
                    res.status(500).send(error);
                } else{
                    await pedido.save();
                    res.send("Su pedido ha sido tramitado");
                }

            }
        }
    } catch (error) {
        res.status(500).send("Se ha producido un error");
    }
});
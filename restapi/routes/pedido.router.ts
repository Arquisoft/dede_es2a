import { Console } from "console";
import express, {Request,response,Response} from "express"
import { request } from "http";
import { ObjectId } from "mongodb";


export const pedidoRouter = express.Router()
var JugueteRepository = require('../repositories/JuguetesRepository');
var PedidoRepository = require('../repositories/PedidosRepository')

pedidoRouter.use(express.json());

pedidoRouter.get("/", async(req:Request,res:Response)=>{
    try{
        let pedidos = await PedidoRepository.getPedidos();
        res.send(pedidos);
    } catch {
        res.status(500).send("Error al listar los pedidos");
    }
});

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

pedidoRouter.get("/:user", async(req:Request,res:Response)=>{
})

async function procesarJuguetes(juguetes:any): Promise<any> {
    try{
        let productos = [];
        for(var producto of juguetes){
            console.log(producto._id)
            let juguete = await JugueteRepository.findJuguete({_id:new ObjectId(producto._id)});
            console.log(juguete)
            if(juguete){
                var cantidad = producto.cantidad;
                if(juguete.stock != 0){
                    if(juguete.stock < producto.cantidad){
                        cantidad = juguete.stock
                    }
                    var nuevoStock = juguete.stock - cantidad;
                    JugueteRepository.updateJuguete({"_id":new ObjectId(producto._id)},{stock:nuevoStock});
                    productos.push(producto._id)
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
        console.log(req.body.productos);
        let productos = await procesarJuguetes(req.body.productos);
        console.log(productos)
        let nuevoPedido = {
            precioSinIva: req.body.precioSinIva,
            precioGastosDeEnvio: req.body.precioGastosDeEnvio,
            precioFinal: req.body.precioSinIva + req.body.precioGastosDeEnvio,
            juguetes: productos
        }
        let pedido = await PedidoRepository.addPedido(nuevoPedido);
        if(pedido){
            res.send("Su pedido ha sido tramitado");
        } else{
            res.status(500).send("Se ha producido un error")
        }
    } catch (error) {
        res.send(error);
    }
});

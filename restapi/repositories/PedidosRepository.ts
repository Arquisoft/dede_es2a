const Pedido = require('../models/Pedido')
// import de API Geocode para calcular coordenadas de una direccion
const ApiGeocode = require('node-geocoder')
// opciones para configurar API Geocode (proveedor, apiKey...)
const opciones = { 
    provider:'google',
}
const geocoder = ApiGeocode(opciones)
// informacion de nuestra tienda, deberia encontrarse en un .env

const PedidoRepository = module.exports = {
    getPedidos: async function(){
        try{
            let pedidos = await Pedido.find({});
            return pedidos;
        } catch (error){
            throw (error);
        }
    },
    findPedido: async function(filter:Object) {
        try{
            let pedido = await Pedido.find(filter);
            return pedido;
        } catch (error){
            throw (error);
        }
    },
    addPedido: async function(object:Object){
        try{
            let pedidoNuevo = new Pedido(object);
            await pedidoNuevo.save();
        } catch (error){
            throw error;
        }
    },
    // calculamos los gastos de envío de un pedido en concreto
    shippingCosts: async function(order:Object){
        // obtenemos la direccion del usuario en sesion a traves del POD
        // calculamos la distancia entre la direccion de nuestra tienda y la del usuario
        // hacemos una formula que calcule el precio (€ por km)
        // le damos valor al atributo gastosDeEnvio del pedido pasado por parámetro
    }
}
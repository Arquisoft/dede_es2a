const Pedido = require('../models/Pedido')

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
    }
}
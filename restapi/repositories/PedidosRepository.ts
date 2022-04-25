const Pedido = require('../models/Pedido')

const PedidoRepository = module.exports = {
    getPedidos: async function(){
        try{
            let pedidos = await Pedido.find({}).populate('juguetes._id ').populate('usuario');
            console.log(pedidos)
            return pedidos;
        } catch (error){
            throw (error);
        }
    },
    findPedido: async function(filter:Object) {
        try{
            console.log(filter)
            let pedido = await Pedido.find(filter).populate('juguetes').populate('usuario');
            return pedido;
        } catch (error){
            throw (error);
        }
    },
    addPedido: async function(object:Object){
        try{
            let pedidoNuevo = new Pedido(object);
            await pedidoNuevo.save();
            return pedidoNuevo;
        } catch (error){
            throw error;
        }
    }
}
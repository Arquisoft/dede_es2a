const Pedido = require('../models/Pedido')
var gestorBd = require('../modules/gestorDB')

const PedidoRepository = module.exports = {
    getPedidos: async function(){
        try{
            gestorBd.connect();
            let pedidos = await Pedido.find({}).populate('juguetes._id ').populate('usuario');
            console.log(pedidos)
            return pedidos;
        } catch (error){
            throw (error);
        }
    },
    findPedido: async function(filter:Object) {
        try{
            gestorBd.connect();
            console.log(filter)
            let pedido = await Pedido.find(filter).populate('juguetes').populate('usuario');
            return pedido;
        } catch (error){
            throw (error);
        }
    },
    addPedido: async function(object:Object){
        try{
            gestorBd.connect();
            let pedidoNuevo = new Pedido(object);
            await pedidoNuevo.save();
            return pedidoNuevo;
        } catch (error){
            throw error;
        }
    }
}
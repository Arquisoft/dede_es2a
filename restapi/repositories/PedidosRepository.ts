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
    },
    // calculamos los gastos de envío de un pedido en concreto
    shippingCosts: async function(order:Object){
        // obtenemos la direccion del usuario en sesion a traves del POD (segunda ventana de pago ya deberia tener los gastos de envio)
        // calculamos la distancia entre la direccion de nuestra tienda y la del usuario (primero probamos con una direccion preestablecida)
        // hacemos una formula que calcule el precio (€ por km)
        // le damos valor al atributo gastosDeEnvio del pedido pasado por parámetro (generamos el pedido en la última parte del pago)
    }
}
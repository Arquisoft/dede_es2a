const Pedido = require('../models/Pedido')
var gestorBd = require('../modules/gestorDB')

const PedidoRepository = module.exports = {
    getPedidos: async function(){
        try{
            gestorBd.connect();
            let pedidos = await Pedido.find({}).populate('juguetes');
            return pedidos;
        } catch (error){
            throw (error);
        }
    },
    findPedido: async function(filter:Object) {
        try{
            gestorBd.connect();
            console.log(filter)
            let pedido = await Pedido.find(filter);
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
    },
    // calculamos los gastos de envío de un pedido en concreto
    shippingCosts: async function(order:Object){
        // obtenemos la direccion del usuario en sesion a traves del POD (segunda ventana de pago ya deberia tener los gastos de envio)
        // calculamos la distancia entre la direccion de nuestra tienda y la del usuario (primero probamos con una direccion preestablecida)
        // hacemos una formula que calcule el precio (€ por km)
        // le damos valor al atributo gastosDeEnvio del pedido pasado por parámetro (generamos el pedido en la última parte del pago)
    }
}
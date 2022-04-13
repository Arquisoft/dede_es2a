import mongoose = require('mongoose');


const pedidoSchema = new mongoose.Schema({
    id:Number,
    precioSinIva:{
        type:Number,
        required:true
    },
    precioGastosDeEnvio:{
        type:Number,
        required:true,
    },
    precioFinal:{
        type:Number,
        required:true,
    },
    juguetes:[{ // juguete que componen el pedido
        type:mongoose.Schema.Types.ObjectId,
        ref: "Juguete",
        required:true
    }]
})

pedidoSchema.set('toJSON', {
    transform: (document:any, returnedObject:any) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Pedido = mongoose.model('Pedido',pedidoSchema)

module.exports = Pedido
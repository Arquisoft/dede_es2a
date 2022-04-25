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
    juguetes:[{// juguetes que componen el pedido
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Juguete',
            required:true
        },
        cantidad:{
            type:Number,
            required:true
        }
    }],
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
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
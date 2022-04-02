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
        type:jugueteSchema,
        required:true
    }],
    usuario:{ // usuario que realiza el pedido
        type:Usuario,
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
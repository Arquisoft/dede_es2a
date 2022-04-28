import mongoose = require('mongoose')

const jugueteSchema = new mongoose.Schema({
    nombre: {
        type : String,
        unique : true
    },
    descripcion: String,
    precio:Number,
    imagen:String,
    categoria:String,
    cantidad:Number,
    stock:Number
})

jugueteSchema.set('toJSON', {
    
    transform: (document:any, returnedObject:any) =>{
        returnedObject.id = returnedObject._id
        returnedObject.cantidad = 0
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Juguete = mongoose.model('Juguete',jugueteSchema)

module.exports = Juguete
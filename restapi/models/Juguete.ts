const mongoose = require('mongoose')

const jugueteSchema = new mongoose.Schema({
    id:Number,
    nombre: {
        type : String,
        unique : true
    },
    descripcion: String,
    precio:Number,
    imagen:String,
    categoria:String,
    cantidad:Number
})

jugueteSchema.set('toJSON', {
    
    transform: (document:any, returnedObject:any) =>{
        returnedObject.id = returnedObject.id
        returnedObject.cantidad = 0
        delete returnedObject.id
        delete returnedObject.__v
    }
})

const Juguete = mongoose.model('Juguete',jugueteSchema)

module.exports = Juguete
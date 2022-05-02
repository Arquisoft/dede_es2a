import mongoose = require('mongoose')

const jugueteSchema = new mongoose.Schema({
    nombre: {
        type : String,
        unique : true,
        required:true
    },
    descripcion: {
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    imagen:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    cantidad:Number,
    stock:{
        type:Number,
        required:true
    }
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
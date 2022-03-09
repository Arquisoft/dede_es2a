const mongoose = require('mongoose')

const jugueteSchema = new mongoose.Schema({
    name: String,
    description: String,
    precio:Number,
    imagen:String,
    categoria:String
})

jugueteSchema.set('toJSON', {
    
    transform: (document:any, returnedObject:any) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Juguete = mongoose.model('Juguete',jugueteSchema)

module.exports = Juguete
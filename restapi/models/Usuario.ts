import mongoose = require('mongoose');

// creamos el esquema que tiene que cumplir el usuario en la BD
const usuarioSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
});

// hacemos que los datos se procesen en formato JSON
usuarioSchema.set('toJSON', {
    
    transform: (document:any, returnedObject:any) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// creamos el modelo para la BD
const Usuario = mongoose.model('Usuario', usuarioSchema);

// lo exportamos como un modulo
module.exports = Usuario;
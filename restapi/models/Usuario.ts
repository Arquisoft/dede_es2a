// creamos el esquema que tiene que cumplir el usuario en la BD
const usuarioSchema = new mongoose.Schema({
    id:Number,
    DNI:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    apellidos:{
        type:Number,
        required:true
    },
    correo:{
        type:String,
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
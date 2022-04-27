var Usuario = require("../models/Usuario");
var gestorBd = require("../modules/gestorDB");

const UsuarioRepository = module.exports = {
    
    getUsuarios: async function(){
        try{
            let usuarios = await Usuario.find({});
            return usuarios;
        } catch (error) {
            throw error;
        }
    },
    findUsuario: async function(filter:Object){
        try{
            let usuario = await Usuario.findOne(filter);
            return usuario;
        } catch (error){
            throw error;
        }
    },
    findAllUsuario: async function(){
        try{
            let usuario = await Usuario.find();
            return usuario;
        } catch (error){
            throw error;
        }
    },
    getJuguetesWithStock: async function(){
        try{
            let juguetes = await Juguete.find({ stock: { $gt: 0 } })
            return juguetes;
        } catch (error){
            throw error;
        }
    },
    /*
    deleteUsuario: async function(filter:Object){
        try{
            let usuario = await Usuario.deleteOne(filter);
            return usuario;
        } catch (error){
            throw error;
        }
    },
    */
    addUsuario: async function(objeto: Object){
        try{
            let nuevoUsuario = new Usuario(objeto);
            let añadido = await nuevoUsuario.save();
            return añadido;
        } catch (error){
            throw error;
        }
    }

    /*
    updateUsuario: async function(filter: Object,update: Object){
        try{
            let usuario = await Usuario.findOneAndUpdate(filter, update, { new:true})
            return usuario;
        } catch (error){
            throw error;
        }
    }
    */
}

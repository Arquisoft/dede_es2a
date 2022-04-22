var Usuario = require("../models/Usuario");
var gestorBd = require("../modules/gestorDB");

const UsuarioRepository = module.exports = {
    
    getUsuarios: async function(){
        try{
            await gestorBd.connect();
            let usuarios = await Usuario.find({});
            return usuarios;
        } catch (error) {
            throw error;
        }
    },
    findUsuario: async function(filter:Object){
        try{
            await gestorBd.connect();
            let usuario = await Usuario.findOne(filter);
            return usuario;
        } catch (error){
            throw error;
        }
    },
    deleteUsuario: async function(filter:Object){
        try{
            await gestorBd.connect();
            let usuario = await Usuario.deleteOne(filter);
            return usuario;
        } catch (error){
            throw error;
        }
    },
    addUsuario: async function(objeto: Object){
        try{
            await gestorBd.connect();
            let nuevoUsuario = new Usuario(objeto);
            let añadido = await nuevoUsuario.save();
            return añadido;
        } catch (error){
            throw error;
        }
    },
    updateUsuario: async function(filter: Object,update: Object){
        try{
            gestorBd.connect();
            let usuario = await Usuario.findOneAndUpdate(filter, update, { new:true})
            return usuario;
        } catch (error){
            throw error;
        }
    }
}

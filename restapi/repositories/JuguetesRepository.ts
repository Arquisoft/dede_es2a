const Juguete = require("../models/Juguete");

const JugueteRepository = module.exports = {
    
    getJuguetes: async function(){
        try{
            let juguetes = await Juguete.find({});
            return juguetes;
        } catch (error) {
            throw error;
        }
    },
    findJuguete: async function(filter:Object){
        try{
            let juguete = await Juguete.findOne(filter);
            return juguete;
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
    deleteJuguete: async function(filter:Object){
        try{
            let juguete = await Juguete.deleteOne(filter);
            return juguete;
        } catch (error){
            throw error;
        }
    },
    addJuguete: async function(objeto: Object){
        try{
            let nuevoJuguete = new Juguete(objeto);
            let añadido = await nuevoJuguete.save();
            return añadido;
        } catch (error){
            throw error;
        }
    },
    updateJuguete: async function(filter: Object,update: Object){
        try{
            let juguete = await Juguete.findOneAndUpdate(filter, update, { new:true})
            return juguete;
        } catch (error){
            throw error;
        }
    }
}

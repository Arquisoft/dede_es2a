import { Console } from "console";
import express, {Request,response,Response} from "express"
import { ObjectId } from "mongodb";

export const usuarioRouter = express.Router()
const Usuario = require('../models/Usuario')
usuarioRouter.use(express.json());


usuarioRouter.get("/", async(req:Request,res:Response) => {
    try{
        let usuarios = await Usuario.find({});
        res.send(usuarios);
    }catch(error){
        res.status(500).send("No se pudo listar los usuarios");
    }
});

usuarioRouter.get("/:email", async(req:Request,res:Response) =>{
    try{
        var filter = {email: req.params.email};
        var usuario = await Usuario.findOne(filter);
        if(usuario){
            res.send(usuario);
        } else{
            res.status(500).send("No existe ese usuario");
        }
    } catch(error){
        res.status(500).send("se ha producido un error");
    }
});

usuarioRouter.post("/", async(req:Request,res:Response) =>{
    try{
        var user = {
            email: req.body.email,
            isAdmin: false,
        }
        var usuario = new Usuario(user);
        var error = usuario.validateSync();
        if(error){
            res.status(500).send(error);
        } else{
            await usuario.save();
            res.send("Usuario añadido correctamente")
        }
    
    } catch(error){
        res.send(error);
    }
});
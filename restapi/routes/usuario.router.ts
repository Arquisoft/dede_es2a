import { Console } from "console";
import express, {Request,response,Response} from "express"
import { ObjectId } from "mongodb";

export const usuarioRouter = express.Router()
var UsuarioRepository = require('../repositories/UsuarioRepository');
usuarioRouter.use(express.json());

usuarioRouter.get("/:email", async(req:Request,res:Response) =>{
    try{
        var filter = {email: req.params.email};
        var usuario = await UsuarioRepository.findUsuario(filter);
        if(usuario){
            res.send(usuario);
        } else{
            res.send("No existe ese usuario");
        }
    } catch(error){
        res.send("se ha producido un error");
    }
});

usuarioRouter.post("/", async(req:Request,res:Response) =>{
    try{
        var user = {
            DNI: req.body.dni,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            isAdmin: false,
        }
        var usuario = await UsuarioRepository.addUsuario(user);
        if(usuario){
            res.send("Usuario añadido correctamente");
        }
        else{
            res.send("El usuario no se ha podido añadir");
        }
    } catch(error){
        res.send(error);
    }
});
import { Console } from "console";
import express, {Request,response,Response} from "express"

export const jugueteRouter = express.Router()

let gestorDB = require("../modules/gestorDB.ts")
const Juguete = require('../models/Juguete')

jugueteRouter.use(express.json());


jugueteRouter.get("/", async (req:Request,res:Response) =>{
    Juguete.find({}).then((juguetes: typeof Juguete) =>{
        res.json(juguetes)
    })
})


jugueteRouter.get("/:_id", async (req:Request,res:Response) =>{
    let _id = req.params._id
    Juguete.find({_id}).then((juguetes: typeof Juguete) =>{
        if(juguetes.length == 0){
            res.send("No se encuentra disponible");
        }
        res.json(juguetes)
    })
})

jugueteRouter.delete("/:_id", async (req:Request,res:Response) =>{
    let id = req.params._id
    Juguete.deleteOne({_id : id}).then((juguetes: typeof Juguete) =>{
        res.send("Eliminado")
    })
})

jugueteRouter.post("/", async (req:Request,res:Response) =>{
    let nuevoJuguete = new Juguete({
        nombre : req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
    });
    console.log(nuevoJuguete)
    nuevoJuguete.save().then((jugueteGuardado:typeof Juguete,err:Error) =>{
        if(err){
            res.send("Ha ocurrido un erro")
        }
        res.send("Añadido nuevo juguete");
    })
    
})

export default jugueteRouter


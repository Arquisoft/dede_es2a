import { Console } from "console";
import express, {Request,response,Response} from "express"


export const jugueteRouter = express.Router()

let gestorDB = require("../modules/gestorDB.ts")
const Juguete = require('../models/Juguete')


jugueteRouter.use(express.json());


jugueteRouter.get("/", async (req:Request,res:Response) =>{
    gestorDB.connect();
    const juguetes = await Juguete.find({});
    res.json(juguetes);
});



jugueteRouter.get("/:_id", async (req:Request,res:Response) =>{
    try{
        let _id = req.params._id
        const juguete = await Juguete.findOne({_id});
        if(juguete){
            res.json(juguete);
        }
        else{
            res.send("El juguete no existe")
        }
    } catch (err) {
        res.status(500).send("Error en el formato");
    }
});

jugueteRouter.delete("/:_id", async (req:Request,res:Response) =>{
    try{
        let _id = req.params._id
        const juguete = await Juguete.findOne({_id})
        console.log("Entró")
        if(juguete){
            await Juguete.deleteOne({_id});
            res.send("Elimado juguete ");
        }
        else{
            res.send("No existe el juguete");
        }
    } catch(err){
        res.status(500).send("Error en el formato")
    }
});

jugueteRouter.post("/", async (req:Request,res:Response) =>{
    try{
        let nuevoJuguete = new Juguete({
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.body.imagen,
            categoria: req.body.categoria,
            stock: req.body.stock
        });
        const juguete = await nuevoJuguete.save(nuevoJuguete);
        res.send("Añadido nuevo juguete")

    } catch{
        res.send("Error");
    }
})



export default jugueteRouter


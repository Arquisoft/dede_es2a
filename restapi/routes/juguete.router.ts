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

/*
jugueteRouter.put("/", async (req:Request,res:Response) =>{
    try{
       await gestorDB.connectToDataBase();
        const newJuguete = req.body as Juguete;
        const result = await collections.juguetes?.updateOne({
            "id": newJuguete.id,
        }, newJuguete)
        res.send(result);
    } catch (error){
        res.status(400).send(error.message);
    }
})


jugueteRouter.delete("/", async(req:Request,res:Response) =>{
    try{
        await gestorDB.connectToDataBase();
        const result = await collections.juguetes?.deleteOne({
            "nombre": "Juan"
        })
        res.send("Eliminau");
    } catch (error){
        res.status(400).send(error.message);
    }
})


jugueteRouter.post("/", async (req:Request,res:Response) =>{
    try{
        await gestorDB.connectToDataBase();
        const newJuguete = req.body as Juguete;
        const result = collections.juguetes?.insertOne(newJuguete);
        result
            ? res.status(200).send("Creado")
            : res.status(500).send("No entró donde debía");
    } catch (error){
        res.status(400).send(error.message);
    }
})
*/
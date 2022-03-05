import express, {Request,Response} from "express";
import {ObjectId} from "mongodb";
import {collections} from "../modules/gestorDB";
import Juguete from "../models/Juguete";
import exp from "constants";


export const jugueteRouter = express.Router();
let gestorDB = require("../modules/gestorDB.ts");


jugueteRouter.use(express.json());



jugueteRouter.post("/", async (req:Request,res:Response) =>{
    try{
        gestorDB.connectToDataBase();
        const newJuguete = req.body as Juguete;
        const result = await collections.juguetes?.insertOne(newJuguete);
        result
            ? res.status(200).send('Creado')
            : res.status(500).send("No entró donde debía");
    } catch (error){
        res.status(400).send(error.message);
    }
})
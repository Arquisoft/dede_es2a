import { Console } from "console";
import express, {Request,response,Response} from "express"
import { request } from "http";


export const pedidoRouter = express.Router()

let gestorDB = require("../modules/gestorDB.ts")
const pedido = require('../models/Pedido')


pedidoRouter.use(express.json());

pedidoRouter.get("/", async(req:Request,res:Response)=>{

});

pedidoRouter.post("/", async (req:Request,res:Response) =>{
    try{
        let nuevoPedido = {
            precioSinIva: req.body.precioSinIva,
            precionGastosDeEnvio: req.body.precioGastosDeEnvio,
            precionFinal: req.body.precioFinal,
            productos: req.body.productos
        }
        await gestorDB.connect();
        await pedido.save(nuevoPedido);
    } catch {

    }
    


})
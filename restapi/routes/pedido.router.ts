import { Console } from "console";
import express, {Request,response,Response} from "express"
import { request } from "http";


export const pedidoRouter = express.Router()

let PedidoRepository = require('../repositories/PedidosRepository')

pedidoRouter.use(express.json());

pedidoRouter.get("/", async(req:Request,res:Response)=>{
    try{
        let pedidos = await PedidoRepository.getPedidos();
        res.send(pedidos);
    } catch {
        res.send("Error al listar los pedidos");
    }
});


pedidoRouter.post("/", async (req:Request,res:Response) =>{
    try{
        let nuevoPedido = {
            precioSinIva: req.body.precioSinIva,
            precionGastosDeEnvio: req.body.precioGastosDeEnvio,
            precionFinal: req.body.precioFinal,
            productos: req.body.productos
        }
        let pedidos = PedidoRepository.addPedido(nuevoPedido);
    } catch (error) {
        throw (error);
    }
});

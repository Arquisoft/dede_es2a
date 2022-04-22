import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import jugueteRouter from '../routes/juguete.router';
import api from "../api"
import exp from 'constants';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api",api)
    app.use("/juguete", jugueteRouter)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
})

describe('pedido ', () => {
    it("Se puede añadir un pedido", async () => {
        let precio =  135.5
        let gastosEnvio =  15
        let precioTotal =  precio + gastosEnvio
        let juguetes = [{"_id":"6248442ddac5d2a2644fb656","cantidad":3},{"_id":"6248449cdac5d2a2644fb659","cantidad":1}]
        const response: Response = await request(app).post('/pedido').send({precioSinIva:precio,precioGastosDeEnvio:gastosEnvio,precioFinal:precioTotal,productos:juguetes});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Su pedido ha sido tramitado")
    });

    it("No se puede añadir un pedido porque no hay stock", async() =>{
        //Cambiamos un juguete a stock 0 para probar
        
    });
});

import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import { pedidoRouter } from '../routes/pedido.router';
import mongoose  from 'mongoose';

const gestorBd = require('../modules/gestorDB');

const datosJuguetes = require('./datos/juguetes.json');
const datos = require('./datos/usuarios.json');
//const datosPedidos = require('./datos/pedidos.json');

const Juguete = require('../models/Juguete');
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };

    gestorBd.connectTest();
    await prepararBd();

    app.use(cors());
    app.use(bp.json());
    app.use("/pedido", pedidoRouter)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

async function prepararBd(){
    await Usuario.deleteMany({});
    await Juguete.deleteMany({});
    await Pedido.deleteMany({});

    for(const dato of datosJuguetes){
        const juguete = new Juguete(dato);
        juguete.save();
    }

    for(const dato of datos){
        const usuario = new Usuario(dato);
        usuario.save();
    }
    /*
    for(const dato of datosPedidos){
        const pedido = new Pedido(dato);
        pedido.save();
    }*/
}

afterAll(async () => {
    await Usuario.deleteMany({})
    await Juguete.deleteMany({});
    await Pedido.deleteMany({});
    mongoose.connection.close();
    server.close() //close the server
})

describe('pedidos ', () => {
    
    it('Se puede crear un pedido', async () =>{
        const response:Response = await request(app).post('/pedido').send({precioSinIva:125,precioGastosDeEnvio:20,productos:[{nombre:"juguete1",cantidad:3}],usuario:"goat@email.com"});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Su pedido ha sido tramitado");
    });

    it('Se pueden listar todos los pedidos', async() =>{
        const response:Response = await request(app).get('/pedido')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual("application/json")
    });

    it('Se pueden listar todos los pedidos de un usuario', async() =>{
        const response:Response = await request(app).get('/pedido/');
        expect(response.status).toBe(200);
        expect(response.type).toEqual("application/json");
    });


});

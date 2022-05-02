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

    it("No se puede crear un pedido por falta de stock", async () =>{
        const response:Response = await request(app).post('/pedido').send({precioSinIva:125,precioGastosDeEnvio:20,productos:[{nombre:"juguete4",cantidad:3}],usuario:"padre@email.com"});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("No se pudo crear el pedido por falta de stock");
    });

    it("No se puede crear un pedido con un usuario que no existe", async () =>{
        const response:Response = await request(app).post('/pedido').send({precioSinIva:125,precioGastosDeEnvio:20,productos:[{nombre:"juguete1",cantidad:3}],usuario:"pedro@email.com"});
        expect(response.statusCode).toBe(500);
        expect(response.text).toEqual("El usuario no existe");
    });

    it("Se puede crear un pedido con un juguete con el stock insuficiente", async() =>{
        const response:Response = await request(app).post('/pedido').send({precioSinIva:50,precioGastosDeEnvio:30,productos:[{nombre:"juguete4",cantidad:3},{nombre:"juguete2",cantidad:2}],usuario:"padre@email.com"});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Su pedido ha sido tramitado");
    });

    it('Se pueden listar todos los pedidos', async() =>{
        const response:Response = await request(app).get('/pedido')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual("application/json")
    });

    it('Se pueden listar todos los pedidos de un usuario', async() =>{
        const response:Response = await request(app).get('/pedido/byUser/goat@email.com');
        expect(response.status).toBe(200);
        expect(response.type).toEqual("application/json");
    });

    it("No se pueden listar los pedidos de un usuario que no tiene", async() =>{
        const response:Response = await request(app).get('/pedido/byUser/carlos@email.com');
        expect(response.status).toBe(200);
        expect(response.text).toEqual("No tiene pedidos");
    });

    it("No se pueden listar los pedidos de un usuario que no existe", async () =>{
        const response:Response = await request(app).get('/pedido/byUser/pedro@email.com');
        expect(response.status).toBe(200);
        expect(response.text).toEqual("El usuario no existe");
    });

    it("Se calculan los gastos de envío con una dirección válida", async () =>{
        const response:Response = await request(app).post('/pedido/gastosEnvio').send({direccion:"Vicente Aleixandre Corvera"});
        expect(response.status).toBe(200);
        expect(Number(response.text).toFixed(2).toString()).toEqual("2.04");
    });

    it("Se calculan los gastos de envío a una dirección que no se encuentra", async () =>{
        const response:Response = await request(app).post('/pedido/gastosEnvio').send({direccion:"La direccion no se encuentra"});
        expect(response.status).toBe(200);
        expect(Number(response.text).toFixed(2).toString()).toEqual("5.00");
    });
});

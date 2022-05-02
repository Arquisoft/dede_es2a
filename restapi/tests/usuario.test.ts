import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import { usuarioRouter } from '../routes/usuario.router';
import mongoose from 'mongoose';


const gestorBd = require('../modules/gestorDB');
const Usuario = require('../models/Usuario');
const datos = require('./datos/usuarios.json');

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
    app.use("/usuario", usuarioRouter);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

async function prepararBd(){
    await Usuario.deleteMany({});

    for(const dato of datos){
        const usuario = new Usuario(dato);
        usuario.save();
    }


}

afterAll(async () => {
    await Usuario.deleteMany({})
    mongoose.connection.close();
    server.close() //close the server
})

describe('user ', () => {
    it("Se puede añadir un usuario", async() =>{
        var dni:String = "7178958B";
        var nombre:String = "nombrePrueba";
        var apellidos:String = "apellidosPrueba";
        var email:String = "prueba@email.com";
        const response:Response =  await request(app).post('/usuario').send({dni:dni,nombre:nombre,apellidos:apellidos,email:email});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Usuario añadido correctamente");
    })

    it("Se puede buscar un usuario", async() =>{
        const response:Response = await request(app).get('/usuario/padre@email.com');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id:response.body.id,
            email: "padre@email.com",
            isAdmin:  false
        });
    });

    it("No se puede buscar un usuario que no existe", async() => {
        const response:Response = await request(app).get('/usuario/noExiste');
        expect(response.statusCode).toBe(500);
        expect(response.text).toEqual("No existe ese usuario");
    });

    it("Listar todos los usuarios de la aplicacion", async () =>{
        const response:Response = await request(app).get('/usuario');
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
    });


});

import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import jugueteRouter from '../routes/juguete.router';
import mongoose from 'mongoose'

const gestorBd = require('../modules/gestorDB');
const datos = require('./datos/juguetes.json');
const Juguete = require('../models/Juguete');

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
    app.use("/juguete", jugueteRouter)

    gestorBd.connectTest();
    await prepararBd();

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

async function prepararBd(){
    await Juguete.deleteMany({});

    for(const dato of datos){
        const juguete = new Juguete(dato);
        juguete.save();
    }
}

afterAll(async () => {
    await Juguete.deleteMany({});
    mongoose.connection.close();
    server.close() //close the server
    

})

describe('juguete ', () => {
    it('Los juguetes se pueden listar', async () => {
        const response:Response = await request(app).get('/juguete')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual("application/json")
    })

    it('Se pueden listar los juguetes tan solo con stock', async () => {
        const response:Response = await request(app).get('/juguete/withStock')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual("application/json")
    })

    it('Se puede añadir un juguete', async () => {
        let name:String = "juguete1Prueba"
        let description:String = "descripcion"
        let price:Number = 13.5
        let imag:String = "alguna"
        let category:String = "la ostia"
        const response:Response = await request(app).post('/juguete').send({nombre:name,descripcion:description,precio:price,imagen:imag,categoria:category})
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Añadido nuevo juguete")
    })

    it("No se puede añadir un juguete que ya existe", async () => {
        let name:String = "juguete1"
        let description:String = "sin categoria1"
        let price:Number = 13.5
        let imag:String = " imagen"
        let category:String = "mu grande"
        const response:Response = await request(app).post('/juguete').send({nombre:name,descripcion:description,precio:price,imagen:imag,categoria:category})
        expect(response.text).toEqual("Este juguete ya existe");
    });

    it('Encontrar un juguete por nombre', async () => {
        let name:String = "juguete2"
        let description:String = "categoria2"
        let price:Number = 11
        let imag:String = "imagen2"
        let category:String = "meh"
        let quantity:Number = 0
        let stock2:Number = 35
        const response: Response = await request(app).get("/juguete/juguete2");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id: response.body.id,
            nombre: "juguete2",
            descripcion: "categoria2",
            precio: 11,
            imagen: "imagen2",
            categoria: "meh",
            cantidad: 0,
            stock:35
        });
    });
    
    it('Se puede actualizar un juguete', async () => {
        let description:String = "decripcion actualizada"
        let price:Number = 10
        let imag:String = "no tiene"
        let category:String = "sin categoria"
        let quantity:Number = 12
        let stock2:Number = 10
        // actualizamos el juguete añadido en la prueba anterior y lo borramos aqui ya que no lo vamos a utilizar mas
        const response:Response = await request(app).post('/juguete/update/juguete1Prueba').send({descripcion:description,precio:price,
            imagen:imag,categoria:category, cantidad : quantity, stock:stock2})
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("El juguete se ha actualizado correctamente")
    });

    it("No se puede actualizar un juguete que no existe", async () => {
        let description:String = "decripcion actualizada"
        let price:Number = 10
        let imag:String = "no tiene"
        let category:String = "sin categoria"
        let quantity:Number = 12
        let stock2:Number = 10
        const response:Response = await request(app).post('/juguete/update/noExiste').send({descripcion:description,precio:price,
            imagen:imag,categoria:category, cantidad : quantity, stock:stock2})
        expect(response.statusCode).toBe(500);
        expect(response.text).toEqual("Error")
    });

    /**
      * test que prueba a obtener un juguete inexistente
    */
    it("No se puede obtener un juguete inexistente (El juguete no existe)", async () => {
       const response: Response = await request(app).get('/juguete/NoExiste');
       expect(response.statusCode).toBe(500);
       expect(response.text).toEqual("El juguete no existe")
    });

    
    it("Se puede eliminar un juguete", async () =>{
        const response: Response = await request(app).delete('/juguete/juguete1Prueba');
        expect(response.text).toEqual("Eliminado juguete")
    });

    it("No se puede eliminar un juguete inexistente", async () => {
        const response: Response = await request(app).delete('/juguete/noExiste');
        expect(response.text).toEqual("No existe el juguete");
    });

    it("Se puede añadir nuevo stock a un juguete", async() =>{
        var stock = 10;
        const response:Response = await request(app).post('/juguete/addStock/juguete1').send({stock:stock});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Stock del juguete añadido correctamente");
    });

    it("No se puede añadir stock a un juguete que no existe", async () => {
        var stock = 10;
        const response:Response = await request(app).post('/juguete/addStock/noExiste').send({stock:stock});
        expect(response.statusCode).toBe(500);
        expect(response.text).toEqual("No se pudo añadir stock al producto");
    });



});

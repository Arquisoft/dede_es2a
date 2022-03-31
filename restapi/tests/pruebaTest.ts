import request, {Response} from 'supertest';
import express, { Application } from 'express';
import mongoose from 'mongoose'
import jugueteRouter from "../routes/juguete.router"
import bp from 'body-parser';

const app:Application = express();

const pjson = require('../package.json')
const Juguete = require("../models/Juguete")

beforeAll(async () => {
    app.use(bp.json());
    app.use(jugueteRouter);
    app.listen(5000);
    
})

afterAll(async () => {
    mongoose.connection.close()
    app.listen().close()
})

describe('juguete ', () => {
    /**
     * Test that we can list users without any error.
     *
    it('can be list', async () => {
        await api
        .get('/juguete')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    })

    it('can be add', async () => {
        
        let name:String = "juguete3"
        let description:String = "un pepinu"
        let price:Number = 13.5
        let imag:String = "alguna"
        let category:String = "la ostia"
        await api.
        post('/juguete').send({nombre:name,descripcion:description,precio:price,imagen:imag,categoria:category})
        .expect("Añadido nuevo juguete")
    })
    */

    it('find one by id', async () => {
        const response: Response = await request(app).get("juguete/622c7f956016f025f28e9b7d");
        console.log(response)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            nombre: "Juguete1",
            descripcion: "Un shiny",
            precio: 15.8,
            imagen: "https://ae01.alicdn.com/kf/H70f6cbb9d19d4b64ae9970e64dae39f4U/TOMY-figuras-de-acci-n-de-Pok-mon-para-ni-os-juguetes-de-transformaci-n-de.jpg_Q90.jpg_.webp",
            categoria: "Bueh"
        }))
    })
    

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     *
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
    */
});
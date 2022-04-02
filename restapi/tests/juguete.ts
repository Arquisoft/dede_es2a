import request, {Response} from 'supertest';
import express, { Application } from 'express';
import jugueteRouter from '../routes/juguete.router';
import mongoose from 'mongoose'
import supertest from 'supertest';
const Juguete = require('../models/Juguete')

const app = require('../server')
let api = supertest(app)
const pjson = require('../package.json')

afterAll(async () => {
    mongoose.connection.close()
    app.listen().close()
})

describe('juguete ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be list', async () => {
        await api
        .get('/juguete')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    });

    // test que comprueba que se obtiene un elemento en concreto
    it('can be list only one', async () => {
        let id = '622c7fab6016f025f28e9b7f';
        let juguete = Juguete.find({id})
        console.log(juguete)
        await api
        .get('/juguete/' + id)
        .expect(200)
        .expect('Content-Type',/application\/json/)
    });

  /**
   * test que prueba a obtener un producto inexistente
   */
   it("No se puede obtener un prodcuto inexistente", async () => {
    const response: Response = await request(app).get("/juguete/noExiste");
    expect(response.statusCode).toBe(204);
  });

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
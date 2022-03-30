import request, {Response} from 'supertest';
import express, { Application } from 'express';
import jugueteRouter from '../routes/juguete.router';
import mongoose from 'mongoose'
import supertest from 'supertest';

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
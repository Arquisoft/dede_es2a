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

/*describe('user ', () => {
    /**
     * Test that we can list users without any error.
     
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('can be list', async () => {
        await api
        const response:Response = await request(app).get('/juguete')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual("application/json")
    })

    it('can be add', async () => {
        
        let name:String = "juguete3"
        let description:String = "un pepinu"
        let price:Number = 13.5
        let imag:String = "alguna"
        let category:String = "la ostia"
        const response:Response = await request(app).post('/juguete').send({nombre:name,descripcion:description,precio:price,imagen:imag,categoria:category})
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Añadido nuevo juguete")
    })

    it('find one by id', async () => {
        const response: Response = await request(app).get("/juguete/622c7f956016f025f28e9b7d");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id: "622c7f956016f025f28e9b7d",
            nombre: "Juguete1",
            descripcion: "Un shiny",
            precio: 15.8,
            imagen: "https://ae01.alicdn.com/kf/H70f6cbb9d19d4b64ae9970e64dae39f4U/TOMY-figuras-de-acci-n-de-Pok-mon-para-ni-os-juguetes-de-transformaci-n-de.jpg_Q90.jpg_.webp",
            categoria: "Bueh",
            cantidad: 0,
        });
    });
});
*/

describe('juguete ', () => {
    /**
     * Test que puede listar los juguetes sin errores.
     
    it('pueden ser listados',async () => {
        const result = await request(app).get("/juguete");
        expect(result).toBe(400);
    });*/

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    /*it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });*/

    /**
   * test que prueba a obtener un producto inexistente
   */
   it("No se puede obtener un producto inexistente", async () => {
    const response: Response = await request(app).get('/juguete/622c7fab6016f025f28e9b7h');
    expect(response.statusCode).toBe(204);
  });
});
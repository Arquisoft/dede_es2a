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

describe('user ', () => {
    it('Los juguetes se pueden listar', async () => {
        await api
        const response:Response = await request(app).get('/juguete')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual("application/json")
    })

    it('Se pueden listar los juguetes tan solo con stock', async () => {
        await api
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
        // lo borramos para que no se quede almacendo en la base de datos
        await request(app).delete('/juguete/juguete1Prueba');
    })

    it('Encontrar un juguete por nombre', async () => {
        // añadimos juguete para prueba
        let name:String = "juguetePruebas"
        let description:String = "descripcion"
        let price:Number = 13.5
        let imag:String = "sin imagen"
        let category:String = "categoria"
        let quantity:Number = 0
        let stock2:Number = 5
        await request(app).post('/juguete').send({nombre:name,descripcion:description,precio:price,imagen:imag,categoria:category,
        cantidad:quantity, stock:stock2})
        // comprobamos que lo podemos encontrar
        const response: Response = await request(app).get("/juguete/juguetePruebas");
        let id = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id: id,
            nombre: "juguetePruebas",
            descripcion: "descripcion",
            precio: 13.5,
            imagen: "sin imagen",
            categoria: "categoria",
            cantidad: 0,
            stock:5
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
        const response:Response = await request(app).post('/juguete/update/juguetePruebas').send({descripcion:description,precio:price,
            imagen:imag,categoria:category, cantidad : quantity, stock:stock2})
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("El juguete se ha actualizo correctamente")
        // lo eliminamos
        await request(app).delete('/juguete/juguetePruebas');
    })


     /**
   * test que prueba a obtener un producto inexistente
   */
   it("No se puede obtener un producto inexistente (El juguete no existe)", async () => {
       const response: Response = await request(app).get('/juguete/NoExiste');
       expect(response.text).toEqual("El juguete no existe")
    });

});

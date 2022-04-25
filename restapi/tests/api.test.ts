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

    it("No se puede añadir un juguete que ya existe", async () => {
        let name:String = "Avión"
        let description:String = "sin descripcion"
        let price:Number = 13.55
        let imag:String = "alguna cosa"
        let category:String = "mu grande"
        const response:Response = await request(app).post('/juguete').send({nombre:name,descripcion:description,precio:price,imagen:imag,categoria:category})
        expect(response.text).toEqual("Este juguete ya existe");
    });

    it('Encontrar un juguete por nombre', async () => {
        // añadimos juguete para prueba
        let name:String = "juguetePruebas"
        let description:String = "descripcion"
        let price:Number = 13.5
        let imag:String = "sin imagen"
        let category:String = "sin categoria"
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
            categoria: "sin categoria",
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
      * test que prueba a obtener un producto inexistente
    */
    it("No se puede obtener un producto inexistente (El juguete no existe)", async () => {
       const response: Response = await request(app).get('/juguete/NoExiste');
       expect(response.text).toEqual("El juguete no existe")
    });
    
    it("Se puede eliminar un producto", async () =>{
        const response: Response = await request(app).delete('/juguete/juguetePruebas');
        expect(response.text).toEqual("Eliminado juguete")
    });

    it("No se puede eliminar un producto inexistente", async () => {
        const response: Response = await request(app).delete('/juguete/noExiste');
        expect(response.text).toEqual("No existe el juguete");
    });

    it("Se puede añadir un pedido", async () => {
        let precio =  135.5
        let gastosEnvio =  15
        let precioTotal =  precio + gastosEnvio
        let juguetes = ["6248442ddac5d2a2644fb656","6248449cdac5d2a2644fb659"]
        const response: Response = await request(app).post('/pedido').send({precioSinIva:precio,precioGastosDeEnvio:gastosEnvio,precioFinal:precioTotal,productos:juguetes});
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Su pedido ha sido tramitado")
    });
});

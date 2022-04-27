require("dotenv").config();

import express, { Application, RequestHandler,  } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from 'mongoose';
import apiUsuarios from './routes/usuario.router';
import apiProductos from './routes/juguete.router';
import apiPedidos from './routes/pedido.router';

const app: Application = express();
app.disable("x-powered-by");
const port: string = process.env.PORT||'5000';
const conexiondb: string = 'mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let allowedOrigins = ['http://localhost:3000'];


const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

app.use(apiUsuarios);
app.use(apiPedidos);
app.use(apiProductos);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

mongoose.connect(conexiondb) 
.then(() => console.log("BD conectada"))
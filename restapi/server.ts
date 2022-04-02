import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 
import { jugueteRouter } from "./routes/juguete.router";
import { url } from "inspector";

const app: Application = express();
const port: number = 5000;

require('dotenv').config()
let bd = require('./modules/gestorDB')

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);



app.use(cors(options));
app.use(bp.json());

app.use("/api", api)

app.get("/", function(req,res){
    res.send("Por aqui no, dale a /juguete");
});



app.use("/juguete", jugueteRouter);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

module.exports = app
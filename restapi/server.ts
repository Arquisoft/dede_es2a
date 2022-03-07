import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 
import { jugueteRouter } from "./routes/juguete.router";

const app: Application = express();
const port: number = 5000;

//BASE DE DATOS
let mongoose = require('mongoose');
let mongo = require('mongodb');
app.set ('db','mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
//let gestorDB = require("./modules/gestorDB.js");


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


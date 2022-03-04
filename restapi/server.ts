import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 

const app: Application = express();
const port: number = 5000;

//BASE DE DATOS
let mongoose = require('mongoose');
let mongo = require('mongodb');
app.set ('db','mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
let gestorDB = require("./modules/gestorDB.ts");


const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);



app.use(cors(options));
app.use(bp.json());

app.use("/api", api)


app.get("/juguete", function(req,res){
  let juguete ={
    nombre: "Pepe"
  }
  mongoose.connect(app.get('db'), function(err:any,db:any){
    if(err){
      res.send("Error de conexión:" + err);
    } else {
        let collection = db.createCollection('juguetes2');
        collection.save(juguete, function (err:any,result:any){
            if(err){
                res.send("Error al insertar" + err);
            } else{
                res.send("Añadío");
            } 
            db.close();
      });
    }

});
});

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});


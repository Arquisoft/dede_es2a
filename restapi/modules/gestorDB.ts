import { Console } from "console";
import express, { Application, RequestHandler } from "express";
import express_prom_bundle from "express-prom-bundle/types";
import { appendFile } from "fs";
import { MongoClient } from "mongodb";

module.exports = {
    mongo : null,
    app : null,
    init : function(app:Application, mongo:any){
        this.mongo = mongo;
        this.app = app;
    },

    añadirJuguete : function(juguete:any){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err:any,db:any){
            let collection = db.collection('juguetes');
            collection.insert(juguete, function (err:any,result:any){
                console.log("Añadío");
                db.close();    
            });

        });
    }


    
}
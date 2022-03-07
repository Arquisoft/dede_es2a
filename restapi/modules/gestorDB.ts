import express, { Application, RequestHandler } from "express";
import express_prom_bundle from "express-prom-bundle/types";
import { appendFile } from "fs";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import * as mongo from "mongodb";


export const collections: {juguetes?: mongo.Collection } = {}

export async function connectToDataBase () {
    const client: mongo.MongoClient = new mongo.MongoClient('mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

    await client.connect();

    const db: mongo.Db = client.db('juguetesDB');

    const juguetesCollection: mongo.Collection = db.collection('juguetes')

    collections.juguetes = juguetesCollection;

    console.log('Conexion satisfactoria');
}
//import mongoose from "mongoose";
const mongoose = require('mongoose')
require('dotenv').config()

const uri: string = process.env.MONGO_URI!;

export function connect(){
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("Database connected")
    });
}

export function connectTest(){
    mongoose.connect('mongodb+srv://admin:dede_es2a@cluster.mf7ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log("Database test connected");
    });
}
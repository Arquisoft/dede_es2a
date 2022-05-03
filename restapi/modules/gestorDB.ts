//import mongoose from "mongoose";
const mongoose = require('mongoose')
require('dotenv').config()



export function connect(){
    mongoose.connect(process.env.MONGO_URI!, {
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
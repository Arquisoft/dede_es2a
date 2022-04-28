//import mongoose from "mongoose";
const mongoose = require('mongoose')
require('dotenv').config()

const database_uri = process.env.DB_CONNECT
const database_test_uri = 'mongodb+srv://admin:<password>@cluster.mf7ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export function connect(){
    mongoose.connect('mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        
    })
    .then(() =>{
        console.log("Database connected")
    })
    ;
}

export function connectTest(){
    mongoose.connect('mongodb+srv://admin:dede_es2a@cluster.mf7ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log("Database test connected");
    });
}
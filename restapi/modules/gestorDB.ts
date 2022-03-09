import mongoose from "mongoose";
const dotenv = require('dotenv')
dotenv.config()

const database_uri = process.env.DB_CONNECT

mongoose.connect('mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
    console.log('database connected')
}).catch((err)=>{
    console.error(err);
})

/*
juguete.save()
    .then((result:typeof Juguete)=> {
        console.log(result);
    })
    .catch((err:Error)=> {
        console.error(err);

    })

Juguete.find({}).then((result) =>{
    console.log(result)
    mongoose.connection.close()
})

/*
export const collections: {juguetes?: mongo.Collection } = {}

export async function connectToDataBase () {
    const client: mongo.MongoClient = new mongo.MongoClient('mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    await client.connect();
    const db: mongo.Db = client.db('juguetesDB');
    const juguetesCollection: mongo.Collection = db.collection('juguetes')
    collections.juguetes = juguetesCollection;
    console.log('Conexion satisfactoria');
}
*/
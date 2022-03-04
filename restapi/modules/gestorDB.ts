

let mongo = require('mongoose');

const url = 'mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

function iniciar(){ // aprender a hacer llamadas a funciones desde fuera
    mongo.connect(url).then(() => {
        console.log('Database connected');
    
    }).catch(() => {
    
        console.error();
    })
}


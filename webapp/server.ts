import express,{Application} from 'express'; 
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs
const mongoose = require('mongoose');


var app: Application = express()
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:dede2a@tiendajuguetes.1s9n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=> {
    console.log('Mongoose is connected!')
})

if(process.env.NODE_ENV==='production') {
    
}



app.use(express.static('build'))

app.listen(port, ():void => {
    console.log('Webapp started on port '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});
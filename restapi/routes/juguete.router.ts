import { Console } from "console";
import express, {Request,response,Response} from "express"
import { ObjectId } from "mongodb";


export const jugueteRouter = express.Router()

let gestorDB = require("../modules/gestorDB.ts")
const Juguete = require('../models/Juguete')


jugueteRouter.use(express.json());


jugueteRouter.get("/", async (req:Request,res:Response) =>{
    gestorDB.connect();
    const juguetes = await Juguete.find({});
    res.json(juguetes);
});

// petición que solo muestra los productos con stock
jugueteRouter.get("/withStock", async (req:Request,res:Response) =>{
    Juguete.find({ __v: { $gt: 0 } }).then((juguetes: typeof Juguete) =>{ // __v deberia ser cantidad
        //console.log(juguetes)
        res.json(juguetes)
    })
})


jugueteRouter.get("/:_id", async (req:Request,res:Response) =>{
    try{
        let _id = req.params._id
        const juguete = await Juguete.findOne({_id});
        if(juguete){
            res.json(juguete);
        }
        else{
            res.status(500).send("El juguete no existe")
        }
    } catch (err) {
        res.status(500).send("Error en el formato");
    }
});

jugueteRouter.delete("/:_id", async (req:Request,res:Response) =>{
    try{
        let _id = req.params._id
        const juguete = await Juguete.findOne({_id})
        console.log("Entró")
        if(juguete){
            await Juguete.deleteOne({_id});
            res.send("Elimado juguete ");
        }
        else{
            res.send("No existe el juguete");
        }
    } catch(err){
        res.status(500).send("Error en el formato")
    }
});

// encuentra un juguete por la id identificativa del juguete, no por la generada por la bd
jugueteRouter.post("/", async (req:Request,res:Response) =>{
    try{
        let nuevoJuguete = new Juguete({
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.body.imagen,
            categoria: req.body.categoria,
            stock: req.body.stock
        });
        const juguete = await nuevoJuguete.save(nuevoJuguete);
        res.send("Añadido nuevo juguete")

    } catch{
        res.send("Error");
    }
})

jugueteRouter.post("/update/:id", async (req:Request,res:Response) =>{
    const filter = { _id : req.params.id }
    const update = { nombre : req.body.nombre, descripcion : req.body.descripcion, 
                precio : req.body.precio, imagen : req.body.imagen, categoria : req.body.categoria,
                cantidad : req.body.cantidad}

    let doc = await Juguete.findOneAndUpdate(filter, update, { new:true}).then((jugueteActualizado:typeof Juguete,err:Error) =>{
        if(err){
            res.send("Ha ocurrido un error con la actualización")
        }
        res.send("El juguete se ha actualizo correctamente");
    });

    /*let jugueteActualizado = new Juguete({
        _id : req.params.id,
        nombre : req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
    });
    jugueteActualizado.save().then((jugueteGuardado:typeof Juguete,err:Error) =>{
        if(err){
            res.send("Ha ocurrido un error en la actualización")
        }
        res.send("Se ha actualizado correctamente");
    })*/

    /*Juguete.findOneAndUpdate({ _id: req.params._id },
        jugueteActualizado,
        { new: true })
    */
})

export default jugueteRouter


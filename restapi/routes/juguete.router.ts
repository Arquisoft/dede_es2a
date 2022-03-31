import { Console } from "console";
import express, {Request,response,Response} from "express"
import { ObjectId } from "mongodb";

export const jugueteRouter = express.Router()

let gestorDB = require("../modules/gestorDB.ts")
const Juguete = require('../models/Juguete')

jugueteRouter.use(express.json());


jugueteRouter.get("/", async (req:Request,res:Response) =>{
    Juguete.find({}).then((juguetes: typeof Juguete) =>{
        res.json(juguetes)
    })
});

// petición que solo muestra los productos con stock
jugueteRouter.get("/withStock", async (req:Request,res:Response) =>{
    Juguete.find({ __v: { $gt: 0 } }).then((juguetes: typeof Juguete) =>{ // __v deberia ser cantidad
        //console.log(juguetes)
        res.json(juguetes)
    })
})

jugueteRouter.get("/:_id", async (req:Request,res:Response) =>{
    let _id = req.params._id
    Juguete.find({_id}).then((juguetes: typeof Juguete) =>{
        if(juguetes.length == 0){
            res.send("No se encuentra disponible");
        }
        res.json(juguetes)
    })
});

jugueteRouter.delete("/:_id", async (req:Request,res:Response) =>{
    let id = req.params._id
    Juguete.deleteOne({_id : id}).then((juguetes: typeof Juguete) =>{
        res.send("Eliminado")
    })
});

jugueteRouter.post("/", async (req:Request,res:Response) =>{
    let nuevoJuguete = new Juguete({
        nombre : req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        cantidad: req.body.cantidad
    });
    nuevoJuguete.save().then((jugueteGuardado:typeof Juguete,err:Error) =>{
        if(err){
            res.send("Ha ocurrido un erro")
        }
        res.send("Añadido nuevo juguete");
    })
    
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


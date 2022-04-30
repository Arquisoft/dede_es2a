import { Console } from "console";
import express, {Request,response,Response} from "express"
import cloudinary from 'cloudinary';
import { ObjectId } from "mongodb";

export const jugueteRouter = express.Router()
const Juguete = require("../models/Juguete");
jugueteRouter.use(express.json());

/**
 * Peticion que muestra todos los juguetes de la lista
 */
jugueteRouter.get("/", async (req:Request,res:Response) =>{
    let juguetes = await Juguete.find({});
    if(juguetes){
        res.json(juguetes);
    } else{
        res.status(500).send("Error al listar los juguetes");
    }
});

/**
 *  Petición que solo muestra los productos con stock
 */ 
jugueteRouter.get("/withStock", async (req:Request,res:Response) =>{
    let juguetes = await Juguete.find({ stock: { $gt: 0 } })
    if(juguetes){
        res.json(juguetes);
    } else {
        res.status(500).send("Error al listar juguetes con stock");
    }
})

/**
 * Peticion que muestra el juguete con el nombre pasado por URL
 */
jugueteRouter.get("/:nombre", async (req:Request,res:Response) =>{
    try{
        let filter  ={nombre :  req.params.nombre}
        let juguete = await Juguete.findOne(filter);
        if(juguete){
            res.json(juguete);
        }
        else{
            res.status(500).send("El juguete no existe")
        }
    } catch (err) {
        res.status(500).send("Ha ocurrido un error al buscarr el juguete");
    }
});

/**
 * Peticion que elimina el juguete con el nombre pasado por URL
 */
jugueteRouter.delete("/:nombre", async (req:Request,res:Response) =>{
    try{
        let filter = {nombre: req.params.nombre}
        let juguete = await Juguete.findOne(filter);
        if(juguete){
            await borrarImagen(juguete.imagen);
            await Juguete.deleteOne(filter);
            res.send("Eliminado juguete");
        }
        else{
            res.send("No existe el juguete");
        }
    } catch(err){
        res.status(500).send("Se ha producido un error");
    }
});

async function borrarImagen(imagen:String){
    var name = imagen.split('/');
    var name2 = name[name.length - 1 ]
    var finalName = name2.split('.')[0];
    await cloudinary.v2.uploader.destroy(finalName);
}

/**
 * Encuentra un juguete por la id identificativa del juguete, no por la generada por la bd
 */ 
jugueteRouter.post("/", async (req:Request,res:Response) =>{
    try{
        let nuevoJuguete = {
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.body.imagen,
            categoria: req.body.categoria,
            stock: req.body.stock
        };
        let juguete = await Juguete.findOne({nombre: nuevoJuguete.nombre});
        if(juguete){
            res.send("Este juguete ya existe");
        } else{
            var nuevaImagen = await cloudinary.v2.uploader.upload(nuevoJuguete.imagen);
            nuevoJuguete.imagen = nuevaImagen.url;
            let jugueteFinal = new Juguete(nuevoJuguete)
            var error = jugueteFinal.validateSync();
            if(error){
                res.status(500).send(error)
            }else{
                jugueteFinal.save();
                res.send("Añadido nuevo juguete")
            }
            
        }
        
    } catch (error) {
        res.status(500).send("Error al añadir un juguete");
    }
})


jugueteRouter.post("/update/:nombre", async (req:Request,res:Response) =>{
    try{
        const filter = { nombre : req.params.nombre }
        const update = { nombre : req.body.nombre, descripcion : req.body.descripcion, 
                precio : req.body.precio, imagen : req.body.imagen, categoria : req.body.categoria,
                cantidad : req.body.cantidad, stock: req.body.stock}
        let jugueteActualizado = await Juguete.findOneAndUpdate(filter, update, { new:true});
        if(jugueteActualizado){
            res.send("El juguete se ha actualizado correctamente");
        } else{
            res.status(500).send("Error");
        }
    } catch (error){
        res.status(500).send("Error al actualizar el juguete");
    }
});

jugueteRouter.post("/addStock/:nombre", async (req:Request,res:Response) => {
    try{
        const filter = {nombre: req.params.nombre}
        console.log("holi")
        var juguete = await Juguete.findOne(filter);
        console.log(juguete.stock)
        console.log(req.body.stock)
        const number:Number = juguete.stock + req.body.stock
        const stock = {stock: number}
        console.log(stock)
        var jugueteActualizado = await Juguete.findOneAndUpdate(filter, stock, { new:true})
        res.send("Stock del juguete añadido correctamente");
    
    }catch (error){
        res.status(500).send("Error al añadir stock al juguete")
    }
});

export default jugueteRouter;

import { Console } from "console";
import express, {Request,response,Response} from "express"
import cloudinary from 'cloudinary';
import { ObjectId } from "mongodb";

export const jugueteRouter = express.Router()
var JugueteRepository = require('../repositories/JuguetesRepository');
jugueteRouter.use(express.json());

/**
 * Peticion que muestra todos los juguetes de la lista
 */
jugueteRouter.get("/", async (req:Request,res:Response) =>{
    let juguetes = await JugueteRepository.getJuguetes();
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
    let juguetes = await JugueteRepository.getJuguetesWithStock();
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
        let juguete = await JugueteRepository.findJuguete(filter);
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
        let juguete = await JugueteRepository.findJuguete(filter);
        if(juguete){
            await borrarImagen(juguete.imagen);
            await JugueteRepository.deleteJuguete(filter);
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
        let juguete = await JugueteRepository.findJuguete({nombre: nuevoJuguete.nombre});
        if(juguete){
            res.send("Este juguete ya existe");
        } else{
            var nuevaImagen = await cloudinary.v2.uploader.upload(nuevoJuguete.imagen);
            nuevoJuguete.imagen = nuevaImagen.url;
            await JugueteRepository.addJuguete(nuevoJuguete);
            res.send("Añadido nuevo juguete")
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
        let jugueteActualizado = await JugueteRepository.updateJuguete(filter,update);
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

        var juguete = await JugueteRepository.findJuguete(filter); 

        const stock = {stock: juguete.stock + req.body.stock}
        
        var jugueteActualizado = await JugueteRepository.updateJuguete(filter,stock);
        if(jugueteActualizado){
            res.send("Stock del juguete añadido correctamente");
        } else{
            res.status(500).send("No se pudo añadir stock al producto")
        }
    }catch (error){
        res.status(500).send("Error al añadir stock al juguete")
    }
});

export default jugueteRouter;

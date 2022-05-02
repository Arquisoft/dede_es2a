import { useNavigate } from "react-router-dom";
import { Juguete } from "../../shared/sharedJuguete";
import './nuevo.css';

var nombre: string;
var descripcion: string;
var categoria: string;
var precio: number;
var imagen: string;
var stock: number;

async function addJuguete(): Promise<any> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + "juguete", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "nombre": nombre,
            "descripcion": descripcion,
            "categoria": categoria,
            "precio": precio,
            "sotck": stock,
            "imagen": imagen
        })
    });
    return response;
    //The objects returned by the api are directly convertible to User objects
}

const AddForm = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Añadir Juguete</h2>
            <div className="formulario">
                <form className="editForm">
                    <div>
                        <label>Nombre:</label>
                        <div>
                            <input id="title" type="text" name="title" placeholder="Nombre del juguete" required
                                onChange={event => nombre = event.target.value} />
                        </div>
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <div>
                            <input id="desc" type="text" name="desc" placeholder="Descripción del juguete" required
                                onChange={event => descripcion = event.target.value} />
                        </div>
                    </div>
                    <div>
                        <label>URL Imagen:</label>
                        <div>
                            <input className="img" id="img" type="text" name="img" placeholder="URL de la imagen del juguete" required
                                onChange={event => imagen = event.target.value} />
                        </div>
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <div>
                            <select id="kind" name="kind" required onChange={event => categoria = event.target.value}>
                                <option>nostalgia</option>
                                <option>vehiculos</option>
                                <option>musicales</option>
                                <option>peluche</option>
                                <option>bebes</option>
                                <option>otros</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Precio (€):</label>
                        <div>
                            <input id="price" type="number" step="0.01" name="price" placeholder="2.50" required
                                onChange={event => precio = parseFloat(event.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label>Stock:</label>
                        <div>
                            <input id="stock" type="number" name="stock" placeholder="10" required
                                onChange={event => stock = parseInt(event.target.value)} />
                        </div>
                    </div>
                    <div className="botones">
                        <button className="cancelar" onClick={() => {
                            navigate("/productos");
                        }}>Cancelar</button>
                        <button type="submit" className="guardar" onClick={() => {
                            // validaciones de campos
                            
                            // guardar en bd
                            addJuguete();
                            //navigate("/home");
                            navigate("/productos");
                            window.location.reload();
                        }}>Guardar</button>
                    </div>
                </form>
                <img className="imagen-producto" src={imagen} alt="Aquí se mostrará la imagen del juguete"></img>
            </div>
        </div>
    )
}

export default AddForm;
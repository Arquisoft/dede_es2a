import { useNavigate } from "react-router-dom";
import './nuevo.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var nombre: string;
var descripcion: string;
var categoria: string;
var precio: number;
var imagen: string;
var stock: number;

async function addJuguete(): Promise<any> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
    
    let response = await fetch(apiEndPoint + "/juguete", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "nombre": nombre,
            "descripcion": descripcion,
            "categoria": categoria,
            "precio": precio,
            "stock": stock,
            "imagen": imagen
        })
    });
    return response;
    //The objects returned by the api are directly convertible to User objects
}

toast.configure();
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
                                <option selected></option>
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
                        <button data-testid="cancelar" id="cancelar" className="cancelar" onClick={() => {
                            navigate("/productos");
                        }}>Cancelar</button>
                        <button data-testid="guardar" id="guardar" type="submit" className="guardar" onClick={async () => {
                            // validaciones de campos
                            if (nombre === "" || nombre == null || nombre === undefined) {
                                toast.warn("El nombre no puede ser vacío", { position: toast.POSITION.TOP_CENTER });
                            } else if (descripcion === "" || descripcion == null || descripcion === undefined) {
                                toast.warn("La descripción no puede ser vacía", { position: toast.POSITION.TOP_CENTER });
                            } else if (imagen === "" || imagen == null || imagen === undefined) {
                                toast.warn("La URL de la imagen no puede ser vacía", { position: toast.POSITION.TOP_CENTER });
                            } else if (categoria === "" || categoria == null || categoria === undefined) {
                                toast.warn("Se debe seleccionar una categoría.", { position: toast.POSITION.TOP_CENTER });
                            } else if (precio <= 0.0 || precio == null || precio === undefined) {
                                toast.warn("El precio debe ser superior a 0", { position: toast.POSITION.TOP_CENTER });
                            } else if (stock <= 0 || stock == null || stock === undefined) {
                                toast.warn("El stock debe ser superior a 0", { position: toast.POSITION.TOP_CENTER });
                            } else {
                                // guardar en bd
                                await addJuguete();
                                // volver a productos
                                window.location.href = ("/productos"); // no funciona
                                //navigate("/productos");
                                window.location.reload();
                            }
                        }}>Guardar</button>
                    </div>
                </form>
                <img className="imagen-producto" src={imagen} alt="Aquí se mostrará la imagen del juguete"></img>
            </div>
        </div>
    )
}

export default AddForm;
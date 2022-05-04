import { useNavigate } from "react-router-dom";
import { Juguete } from "../../shared/sharedJuguete";
import './editar.css';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var url = window.location.href;
var nombre: string;
var descripcion: string;
var categoria: string;
var precio: number;

async function getJuguete(): Promise<Juguete> {
    //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    const apiEndPoint = process.env.API_URL || 'http://localhost:5000'
    let partes = url.split('/');
    let response = await fetch(apiEndPoint + "/juguete/" + partes[partes.length - 1]);
    //The objects returned by the api are directly convertible to User objects
    let j = response.json();
    return j;
}

async function updateJuguete(): Promise<any> {
    const apiEndPoint = process.env.API_URL || 'http://localhost:5000'
    let partes = url.split('/');
    let response = await fetch(apiEndPoint + "/juguete/update/" + partes[partes.length - 1], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "nombre": nombre,
            "descripcion": descripcion,
            "categoria": categoria,
            "precio": precio
        })
    });
    return response;
    //The objects returned by the api are directly convertible to User objects
}

toast.configure();
const EditForm = () => {
    const navigate = useNavigate();
    const { data } = useQuery<Juguete>('juguete', getJuguete);
    nombre = data?.nombre != null ? data?.nombre : "";
    descripcion = data?.descripcion != null ? data?.descripcion : "";
    precio = data?.precio != null ? data?.precio : 0;
    categoria = data?.categoria != null ? data?.categoria : "";
    return (
        <div>
            <h2>Modificar juguete</h2>
            <div className="formularioYfoto">
                <form className="editForm">
                    <div>
                        <label>Nombre:</label>
                        <div>
                            <input id="title" type="text" name="title" defaultValue={data?.nombre}
                                placeholder="Nombre del juguete" required
                                onChange={event => nombre = event.target.value} />
                        </div>
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <div>
                            <input id="desc" type="text" name="desc" defaultValue={data?.descripcion}
                                placeholder="Descripción del juguete" required
                                onChange={event => descripcion = event.target.value} />
                        </div>
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <div>
                            <select id="kind" name="kind" required onChange={event => categoria = event.target.value}>
                                {data?.categoria === "nostalgia" ? <option selected>nostalgia</option> : <option>nostalgia</option>}
                                {data?.categoria === "vehiculo" ? <option selected>vehiculos</option> : <option>vehiculos</option>}
                                {data?.categoria === "musicales" ? <option selected>musicales</option> : <option>musicales</option>}
                                {data?.categoria === "peluche" ? <option selected>peluche</option> : <option>peluche</option>}
                                {data?.categoria === "bebes" ? <option selected>bebes</option> : <option>bebes</option>}
                                {data?.categoria === "otros" ? <option selected>otros</option> : <option>otros</option>}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Precio (€):</label>
                        <div>
                            <input id="price" type="number" step="0.01" name="price"
                                defaultValue={data?.precio} placeholder="2.50" required
                                onChange={event => precio = parseFloat(event.target.value)} />
                        </div>
                    </div>
                    <div className="botones">
                        <button className="cancelar" onClick={() => {
                            navigate("/productos");
                        }}>Cancelar</button>
                        <button type="submit" className="guardar" onClick={() => {
                            // validaciones de campos
                            if (nombre === "" || nombre == null || nombre === undefined) {
                                toast.warn("El nombre no puede ser vacío", { position: toast.POSITION.TOP_CENTER });
                            } else if (descripcion === "" || descripcion == null || descripcion === undefined) {
                                toast.warn("La descripción no puede ser vacía", { position: toast.POSITION.TOP_CENTER });
                            } else if (precio <= 0.0 || precio == null || precio === undefined) {
                                toast.warn("El precio debe ser mayor que 0", { position: toast.POSITION.TOP_CENTER });
                            } else {
                                // guardar en bd
                                updateJuguete();
                                // volver a productos
                                //window.location.href = "/productos"; // no funciona
                                navigate("/productos");
                                window.location.reload();
                            }
                        }}>Guardar</button>
                    </div>
                </form>
                <img className="imagen-producto" src={data?.imagen} alt={data?.nombre}></img>
            </div>
        </div>
    )
}

export default EditForm;
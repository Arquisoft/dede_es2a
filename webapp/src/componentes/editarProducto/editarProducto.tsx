import { useNavigate } from "react-router-dom";
import { Juguete } from "../../shared/sharedJuguete";
import './editar.css';
import { useQuery } from 'react-query';

var url = window.location.href;
var nombre: string;
var descripcion: string;
var categoria: string;
var precio: number;

async function getJuguete(): Promise<Juguete> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let partes = url.split('/');
    //console.log(partes[partes.length - 1]);
    let response = await fetch(apiEndPoint + "juguete/" + partes[partes.length - 1]);
    //The objects returned by the api are directly convertible to User objects
    let j = response.json();
    console.log(j);
    return j;
}

async function updateJuguete(): Promise<any> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let partes = url.split('/');
    let response = await fetch(apiEndPoint + "juguete/update" + partes[partes.length - 1], {
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

const EditForm = () => {
    const navigate = useNavigate();
    const { data } = useQuery<Juguete>('juguete', getJuguete);

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
                                {data?.categoria === "nostalgia" ? <option selected>Nostalgia</option> : <option>Nostalgia</option>}
                                {data?.categoria === "vehiculo" ? <option selected>Vehiculos</option> : <option>Vehiculos</option>}
                                {data?.categoria === "musicales" ? <option selected>Musicales</option> : <option>Musicales</option>}
                                {data?.categoria === "peluche" ? <option selected>Peluche</option> : <option>Peluche</option>}
                                {data?.categoria === "bebés" ? <option selected>Bebés</option> : <option>Bebés</option>}
                                {data?.categoria === "otros" ? <option selected>Otros</option> : <option>Otros</option>}
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
                            console.log(nombre);
                            console.log(descripcion);
                            console.log(precio);
                            // guardar en bd
                            updateJuguete();
                            navigate("/productos");
                        }}>Guardar</button>
                    </div>
                </form>
                <img className="imagen-producto" src={data?.imagen} alt={data?.nombre}></img>
            </div>
        </div>
    )
}

export default EditForm;
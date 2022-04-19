import { useNavigate } from "react-router-dom";
import './editar.css'

const EditForm = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Modificar juguete</h2>
            <div className="formularioYfoto">
                <form className="editForm">
                    <div>
                        <label>Nombre:</label>
                        <div>
                            <input id="title" type="text" name="title"
                                placeholder="Nombre del juguete" required />
                        </div>
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <div>
                            <input id="desc" type="text" name="desc"
                                placeholder="Descripción del juguete" required />
                        </div>
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <div>
                            <select id="kind" name="kind" required >
                                <option >Pokemon</option>
                                <option >Acción</option>
                                <option >Bey Blade</option>
                                <option >Otros</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Precio (€):</label>
                        <div>
                            <input id="price" type="number" step="0.01" name="price"
                                placeholder="2.50" required />
                        </div>
                    </div>
                    <div className="botones">
                        <button className="cancelar" onClick={() => {
                            navigate("/productos");
                        }}>Cancelar</button>
                        <button className="guardar" onClick={() => {
                            // comprobar que los campos no están vacíos
                            // guardar de vdd
                            navigate("/productos");
                        }}>Guardar</button>
                    </div>
                </form>
                /* AÑADIR IMAGEN DEL PRODUCTO */
            </div>
        </div>
    )
}

export default EditForm;
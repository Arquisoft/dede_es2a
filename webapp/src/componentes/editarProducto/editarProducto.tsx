import { useNavigate } from "react-router-dom";

const EditForm = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Modificar juguete</h2>
            <form id="editForm">
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
                            <option id="pop">Pokemon</option>
                            <option id="folk">Acción</option>
                            <option id="rock" >Bey Blade</option>
                            <option id="otros">Otros</option>
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
                <div>
                    <button onClick={() => { navigate("/productos") }}>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default EditForm;
import Button from '@material-ui/core/Button';
//Types
//import { CartItemType } from '../App';
//Styles
import { Wrapper } from './Item.styles';

import { Juguete } from '../shared/sharedJuguete';


import { BrowserRouter, useNavigate } from "react-router-dom";
import getRoleUsuario from "../componentes/Login/LoginButton"
import { Router } from 'express';

/*type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}*/
type Props = {
    item: Juguete;
    handleAddToCart: (clickedItem: Juguete) => void;
}

async function addStock(nombre: string): Promise<any> {
    //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-es2a-restapi.herokuapp.com/'
    //let response = 
    await fetch(apiEndPoint + '/juguete/addStock/' + nombre, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "stock": 10 })
    });
}

/*
function mifuncion({ url: any } => {
    navigate(url);
});
*/
//Así creamos un elemento reactivo con las propiedades especificadas
const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    return (
        <Wrapper>
            {
               localStorage.getItem("isAdmin")==="true" ? // isAdmin ?
                    <div>
                        <img src={item.imagen} alt={item.nombre} />
                        <h3>{item.nombre}</h3>
                        <p>{item.descripcion}</p>
                        <h3>{item.precio}€</h3>
                        <Button id="botonEditar" onClick={() => {
                            // añadir al localStorage el Item para poder coger sus datos
                            window.location.href = "/edit/" + item.nombre;
                            //navigate("/edit/../id");
                       
                        }}>Editar producto</Button>
                        <Button id="botonAnadir" onClick={() => {
                            addStock(item.nombre);
                        }}>Añadir existencias</Button>
                    </div>
                    :
                    <div>
                        <img src={item.imagen} alt={item.nombre} />
                        <h3>{item.nombre}</h3>
                        <p>{item.descripcion}</p>
                        <h3>{item.precio}€</h3>
                        <Button id='botonAnadirAlCarrito' data-testid="botonAnadirAlCarrito" onClick={() => handleAddToCart(item)}>Añadir al carrito</Button>
                    </div>
                    
            }
        </Wrapper>
    )
}

export default Item;

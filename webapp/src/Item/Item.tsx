import Button from '@material-ui/core/Button';
//Types
import { CartItemType } from '../App';
//Styles
import { Wrapper } from './Item.styles';

import { Juguete } from '../shared/sharedJuguete';

import { useNavigate } from "react-router-dom";

/*type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}*/
type Props = {
    item: Juguete;
    handleAddToCart: (clickedItem: Juguete) => void;
}

async function addStock(): Promise<Juguete[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + 'juguete/withstock');
    //The objects returned by the api are directly convertible to User objects
    //console.log(response.json());
    return response.json();
}

/*
function mifuncion({ url: any } => {
    navigate(url);
});
*/
//Así creamos un elemento reactivo con las propiedades especificadas
const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            {
                false ? // isAdmin ?
                    <div>
                        <img src={item.imagen} alt={item.nombre} />
                        <h3>{item.nombre}</h3>
                        <p>{item.descripcion}</p>
                        <h3>€{item.precio}</h3>
                        <Button onClick={() => {
                            // añadir al localStorage el Item para poder coger sus datos
                            navigate("/edit");
                        }}>Editar producto</Button>
                        <Button onClick={() => {
                            // faltaria añadir stock -> crear método

                            
                        }}>Añadir existencias</Button>
                    </div>
                    :
                    <div>
                        <img src={item.imagen} alt={item.nombre} />
                        <h3>{item.nombre}</h3>
                        <p>{item.descripcion}</p>
                        <h3>€{item.precio}</h3>
                        <Button onClick={() => handleAddToCart(item)}>Añadir al carrito</Button>
                    </div>
            }
        </Wrapper>
    )
}

export default Item;

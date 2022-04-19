import Button from '@material-ui/core/Button';
//Types
import { CartItemType } from '../App';
//Styles
import { Wrapper } from './Item.styles';

import { Juguete } from '../shared/sharedJuguete';



/*type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}*/

type Props = {
    item: Juguete;
    handleAddToCart: (clickedItem: Juguete) => void;
}

//Así creamos un elemento reactivo con las propiedades especificadas
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        {
            true ? // isAdmin ?
                <div>
                    <img src={item.imagen} alt={item.nombre} />
                    <h3>{item.nombre}</h3>
                    <p>{item.descripcion}</p>
                    <h3>€{item.precio}</h3>
                    <Button onClick={() => handleAddToCart(item)}>Editar producto</Button>
                    <Button onClick={() => handleAddToCart(item)}>Añadir existencias</Button>
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

export default Item;

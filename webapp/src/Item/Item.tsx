import Button from '@material-ui/core/Button';
//Types
import {CartItemType} from '../App';
//Styles
import {Wrapper} from './Item.styles';

import {Juguete} from '../shared/sharedJuguete';

/*type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}*/

type Props = {
    item: Juguete;
    handleAddToCart: (clickedItem: Juguete) => void;
}

//Así creamos un elemento reactivo con las propiedades especificadas
//<img src={item.imagen} alt={item.nombre}/>
const Item: React.FC<Props> = ({item, handleAddToCart})=>(
    <Wrapper>
        <div>
            <h3>{item.nombre}</h3>
            <p>{item.descripcion}</p>
            <h3>€{item.precio}</h3>
        </div>
        <Button onClick = {() => handleAddToCart(item)}>Añadir al carrito</Button>
    </Wrapper>
)

export default Item;

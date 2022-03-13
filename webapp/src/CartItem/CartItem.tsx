import Button from '@material-ui/core/Button';
//types
import {CartItemType} from '../App';
import Item from '../Item/Item';
import {Juguete} from '../shared/sharedJuguete';


//Styles
import {Wrapper} from './CartItem.styles';

/*type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void;
}*/

type Props = {
    item: Juguete;
    addToCart: (clickedItem: Juguete) => void;
    removeFromCart: (id:number) => void;
}


const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (
    <Wrapper>
        <div>
            <h3>{item.nombre}</h3>
            <div className="information">
                <p>Precio: €{item.precio} </p>
                <p>Total: €{(item.cantidad * item.precio).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size = 'small'
                    disableElevation
                    variant='contained'
                    onClick={()=>removeFromCart(item.id)}
                    >
                    -
                </Button>
                <p>{item.cantidad}</p>
                <Button
                    size = 'small'
                    disableElevation
                    variant='contained'
                    onClick={()=>addToCart(item)}
                    >
                    +
                </Button>

            </div>
        </div>
        <img src={item.imagen} alt={item.nombre}/>
    </Wrapper>
)

export default CartItem;


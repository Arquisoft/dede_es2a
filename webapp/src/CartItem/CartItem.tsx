import Button from '@material-ui/core/Button';

//types
import {Juguete} from '../shared/sharedJuguete';


//Styles
import {Wrapper} from './CartItem.styles';


type Props = {
    item: Juguete;
    addToCart: (clickedItem: Juguete) => void;
    removeFromCart: (nombre:string) => void;
}


const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (
    
    <Wrapper>
        <div>
            <h3>{item.nombre}</h3>
            <div className="information">
                <p>Precio: {item.precio}€ </p>
                <p>Total:{(item.cantidad * item.precio).toFixed(2)}€</p>
            </div>
            <div className="buttons">
                <Button
                    size = 'small'
                    disableElevation
                    variant='contained'
                    onClick={()=>removeFromCart(item.nombre)}
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


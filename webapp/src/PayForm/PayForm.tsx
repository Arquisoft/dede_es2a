import CartItem from '../CartItem/CartItem';


//Styles
import {Wrapper} from '../Cart/Cart.styles';

//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';



/*type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem:CartItemType)=> void;
    removeFromCart: (id:number) => void;aa
};*/

type Props = {
    cartItems: Juguete[];
};


const PayForm:React.FC<Props> = ({cartItems})=> {
    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    console.log(cartItems)
    return (
        <Wrapper>
            <h2>Tu Pedido</h2>
            {cartItems.length===0 ? <p>No hay juguetes en el carrito</p>: null}
            {cartItems.map(item=>(
                <div> 
                    <h3>{item.nombre}</h3>
                    <h3>{item.cantidad}</h3>
                    <h3>{item.cantidad*item.precio}</h3>
                </div>
            ))}
            <h2>Va a pagar: {calculateTotal(cartItems).toFixed(2)}€</h2>

            <button type="button" className="btn btn-primary">

            </button>
        </Wrapper>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default PayForm;
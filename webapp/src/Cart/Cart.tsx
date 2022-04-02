import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';
//Styles
import {Wrapper} from './Cart.styles';

//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';



/*type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem:CartItemType)=> void;
    removeFromCart: (id:number) => void;
};*/

type Props = {
    cartItems: Juguete[];
    addToCart: (clickedItem:Juguete)=> void;
    removeFromCart: (nombre:string) => void;
};

const Cart:React.FC<Props> = ({cartItems, addToCart, removeFromCart})=> {

    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const { isAuthenticated } = useAuth0();
    const href=!isAuthenticated?"login":"confirmar-pedido";
    return (
        <Wrapper>
            <h2>Tu Carrito</h2>
            {cartItems.length===0 ? <p>No hay juguetes en el carrito</p>: null}
            {cartItems.map(item=>(
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: {calculateTotal(cartItems).toFixed(2)}€</h2>               
           {  
               cartItems.length===0 ?
            <li key={0}>
        
            </li> :
            <li key={0}>
                <a className={'active'} href={href}>
                    {'Pagar'}
                </a>
            </li>
            }           
        </Wrapper>
    )
};

export default Cart;
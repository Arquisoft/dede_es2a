import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';
//Styles
import {Wrapper} from './Cart.styles';
import { Typography } from "@material-ui/core";

import {Juguete} from '../shared/sharedJuguete';
import LoginButtonCart from '../componentes/Login/LoginButtonCart';

type Props = {
    cartItems: Juguete[];
    addToCart: (clickedItem:Juguete)=> void;
    removeFromCart: (nombre:string) => void;
};

const Cart:React.FC<Props> = ({cartItems, addToCart, removeFromCart})=> {

    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return (
        <Wrapper>
            <Typography color="textPrimary" variant="h2" component="h2">Tu carrito</Typography>
            {cartItems.length===0 ? <p>No hay juguetes en el carrito</p>: null}
            {cartItems.map(item=>(
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}    
            <Typography variant="h4" component="h2">Total: {calculateTotal(cartItems).toFixed(2)}€</Typography>        
            {  
               cartItems.length===0 ?
            <div>
        
            </div> :
            isAuthenticated?
            <div>
                <a className={'btn btn-primary btn-lg'} href={"confirmar-pedido"}>
                    {'Realizar pedido'}
                </a>
            </div>:
              <div>
             <LoginButtonCart />
              </div>
            }           
        </Wrapper>
    )
};

export default Cart;
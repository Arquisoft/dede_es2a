import * as React from "react";
import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';


//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';

type Props = {
    cartItems: Juguete[];
    gastosEnvio: number;
    siguientePaso: () => void;
}

const Review:React.FC<Props> = ({cartItems, gastosEnvio, siguientePaso})=> {
    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const price = calculateTotal(cartItems);
    return (
        <div>
            <h2>Resumen</h2>
            <p>Total productos(Imp. incluidos): <b>{price.toFixed(2)}€</b></p>
            <p>Gastos de envío: <b>gastos_de_envio</b></p>
            <button type="button" className="btn btn-primary">
                Permisos de POD
            </button>
        </div>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default Review;
import * as React from "react";
import CartItem from '../CartItem/CartItem';
//import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button";


//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';

type Props = {
    cartItems: Juguete[];
    setDeliveryCost: (n:number) => void;
    deliveryCost: number;
    siguientePaso: () => void;
    setAddress:(n:string) => void;
    address: string;
}

const Summary:React.FC<Props> = ({cartItems, setDeliveryCost, deliveryCost, siguientePaso, setAddress, address})=> {
    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const price = calculateTotal(cartItems);
    return (
        <div>
            <div>
              //Aqui irian los transportistas sacados por la api
              Transportistas
            </div>

            <div id="resumen">
              <h2>Resumen</h2>
              <p>Total productos(Imp. incluidos): <b>{price.toFixed(2)}€</b></p>
              <p>Gastos de envío: <b>{deliveryCost}</b></p>
              <h3>Total: {(deliveryCost + price).toFixed(2)}€</h3>

              <Button
              onClick={siguientePaso}
              variant="contained"
              className="m-1"
            >
              Guardar y continuar
            </Button>
            </div>

            <div>
              <h3>opciones de entrega</h3>
              <p>Fecha de entrega???</p>
              <p>numero de bultos</p>
            </div>
         
        </div>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default Summary;
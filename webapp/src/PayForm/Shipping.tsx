import * as React from "react";
import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button";


//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';
import { Typography } from "@material-ui/core";

type Props = {
    cartItems: Juguete[];
    setDeliveryCost: (n:number) => void;
    deliveryCost:number;
    siguientePaso: () => void;
    setAddress:(n:string) => void;
}

const Shipping:React.FC<Props> = ({cartItems, setDeliveryCost, deliveryCost, siguientePaso, setAddress})=> {
    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const price = calculateTotal(cartItems);
    //TODO
    const obtainPodAndCalculateDeliveryCost = () => {
        //La que sea del POD
        setAddress("");
        //Aqui calculamos gastos de envío con la api


        //Aqui colocamos los gastos de envio
        setDeliveryCost(0);
    }
    return (
        <div>
            <div id="resumen">
                <Typography variant="h2" component="h2"> Total</Typography>
                <p>Total productos(Imp. incluidos): <b>{price.toFixed(2)}€</b></p>
                <p>Gastos de envío: <b>{deliveryCost}</b></p>
                <Typography variant="h4" component="h2">Total: {(deliveryCost + price).toFixed(2)}€</Typography>
                <Button
                onClick={siguientePaso}
                variant="contained"
                className="m-1"
                >
                Guardar y continuar
                </Button>
            </div>
            <Button
              onClick={obtainPodAndCalculateDeliveryCost}
              variant="contained"
              className="m-1"
            >
              Boton del POD
            </Button>
     
        </div>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default Shipping;
import * as React from "react";
import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';
//Types
import { CartItemType } from '../App';
import {Juguete} from '../shared/sharedJuguete';
import { Typography } from "@material-ui/core";

export default function FinalizedOrder(props: any): JSX.Element {

    localStorage.clear();
    
    /*
    sessionStorage.removeItem("webID");
    sessionStorage.removeItem("sessionID");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("organizacion");
    sessionStorage.removeItem("direccion");
    */
    // tener en cuenta que quizas hay que restaurar tambien el carrito
       
    return (
        <div>
             <Typography variant="h2" component="h2">Pedido finalizado</Typography>
            <Typography variant="h5" component="h2">Muchas gracias por su compra!</Typography>

            <a  data-testid="botonFinalizarPedido" className={'btn btn-primary btn-lg'} href={"/logoutPago"}>
                    {'Finalizar Pedido'}
                </a>

        </div>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl

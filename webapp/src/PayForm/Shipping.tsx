import * as React from "react";
import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from "@mui/material/Paper";
import LoginForm from '../componentes/loginSOLID/LoginForm';
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
    return (
        <div>
         <Paper elevation = {4} sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}> 
         <Typography variant="h4" component="h2">Otorgue su dirección a través de su POD</Typography>
          <Typography >(Se seleccionará Inrupt por defecto)</Typography>
        <LoginForm/>
      </Paper>
           <Card elevation = {4} sx={{ maxWidth: 600 }} >
          <CardContent>
            <Typography variant="h2" component="h2">Resumen</Typography>
              <p>Total productos(Imp. incluidos): <b>{price.toFixed(2)}€</b></p>
              <Typography variant="h6" component="h2">-------------------------------------------------------------------</Typography>
              <Typography variant="h4" component="h2">Total: {(deliveryCost + price).toFixed(2)}€</Typography>
              </CardContent>
              <CardActions>
              <Button
              onClick={siguientePaso}
              variant="contained"
              className="m-1"
            >
              Guardar y continuar
            </Button>
            </CardActions>
            </Card>
        
          
        </div>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default Shipping;
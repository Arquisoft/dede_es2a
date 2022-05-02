import * as React from "react";
import CartItem from '../CartItem/CartItem';
import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from "@mui/material/Paper";
import Grid from '@material-ui/core/Grid';

//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';
import SummaryItem from "./SummaryItem";

type Props = {
    cartItems: Juguete[];
    setDeliveryCost: (n:number) => void;
    deliveryCost: number;
    siguientePaso: () => void;
    setAddress:(n:string) => void;
    address: string;
    deliveryDate:string;
}
/*
//Procesar pedido
async function finalizarPedido(precioGastosDeEnvio : number,precioSinIva : number ,juguetes: Juguete[]): Promise<any> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  let response = await fetch(apiEndPoint + 'pedido/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "precioGastosDeEnvio": 10,
        "precioSinIva": 10,
        "usuario":localStorage.getItem("usuario"),
        "productos":juguetes
      })
  });
}*/

const Review:React.FC<Props> = ({cartItems, setDeliveryCost, deliveryCost, siguientePaso, setAddress, address , deliveryDate})=> {
    const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const price = calculateTotal(cartItems);
    const finalPrice:number = price + parseFloat(deliveryCost.toString());
    return (
        <div>
             <Grid container spacing={3}>
            {cartItems.map(item=>(
                <SummaryItem 
                    key={item.id}
                    item={item}
                />
            ))}   
               </Grid>
          <Paper elevation = {9} sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" component="h2">Entrega</Typography>
            <p >Dirección de entrega: <b>{localStorage.getItem("direccion")}</b></p>
            </Paper>
          <Card elevation = {4} sx={{ maxWidth: 600 }} >
          <CardContent>
            <Typography variant="h2" component="h2">Resumen</Typography>
              <p>Total productos(Imp. incluidos): <b>{price.toFixed(2)}€</b></p>
              <p>Gastos de envío: <b>{deliveryCost}€</b></p>
              <Typography variant="h6" component="h2">-------------------------------------------------------------------</Typography>
              <Typography variant="h4" component="h2">Total: {(finalPrice).toFixed(2)}€</Typography>
              </CardContent>
              <CardActions>
              <Button
              id="botonSiguiente"
              onClick={
                siguientePaso
              }
              variant="contained"
              className="m-1"
            >
             Finalizar Pedido
            </Button>
            </CardActions>
            </Card>
         
        </div>
    )
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default Review;
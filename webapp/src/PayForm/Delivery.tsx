import * as React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from "@mui/material/Paper";

//Types
import {Juguete} from '../shared/sharedJuguete';

type Props = {
    cartItems: Juguete[];
    setDeliveryCost: (n:number) => void;
    deliveryCost: number;
    siguientePaso: () => void;
    setAddress:(n:string) => void;
    address: string;
    setDeliveryDate:(n:string) => void;
}

const Delivery:React.FC<Props> = ({cartItems, setDeliveryCost, deliveryCost, siguientePaso, setAddress, address})=> {
  console.log(deliveryCost)  
  const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    const price = calculateTotal(cartItems);
    const finalPrice:number = price + parseFloat(deliveryCost.toString());
    return (
        <div>
           <Paper elevation = {9} sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" component="h2">Entrega</Typography>
            <p >Dirección de entrega: <b>{localStorage.getItem("direccion")}</b></p>
            </Paper>
            <Card sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }} elevation={4}>
          <CardContent>
            <Typography variant="h2" component="h2">Resumen</Typography>
              <p>Total productos(Imp. incluidos): <b>{price.toFixed(2)}€</b></p>
              <p>Gastos de envío: <b>{deliveryCost}€</b></p>
              <Typography variant="h6" component="h2">-------------------------------------------------------------------</Typography>
              <Typography variant="h4" component="h2">Total: {finalPrice.toFixed(2)}€</Typography>
              </CardContent>
              <CardActions>
              <Button
              id="botonSiguiente"
              data-testid="botonSiguiente"
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
export default Delivery;
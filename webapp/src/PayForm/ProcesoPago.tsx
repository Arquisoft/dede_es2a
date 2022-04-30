import CartItem from '../CartItem/CartItem';

import * as React from "react";
import Paper from "@mui/material/Paper";
//Styles
import {Wrapper} from '../Cart/Cart.styles';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Container from "@mui/material/Container";
//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';

import Shipping from './Shipping';
import Delivery from './Delivery';
import Review from './Review';
import FinalizedOrder from './FinalizedOrder';


/*
type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem:CartItemType)=> void;
    removeFromCart: (id:number) => void;aa
};
*/

type Props = {
    cartItems: Juguete[];
};
let condPedido= true;
let gastosEnvio:any; 

//Procesar pedido
async function finalizarPedido(precioGastosDeEnvio : string,juguetes: Juguete[]): Promise<any> {
  let p:number = parseFloat(precioGastosDeEnvio);
  const calculateTotal = (items:Juguete[]) =>
    items.reduce((ack:number, item) => ack + item.cantidad*item.precio,0);
    var price:number;
    price = calculateTotal(juguetes);
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  let response = await fetch(apiEndPoint + 'pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "precioGastosDeEnvio":p,
        "precioSinIva": price,
        "usuario":"ace@email.com",
        "productos":juguetes
      })
  });
  return response;
}

// Petición para obtener los gastos de envio
async function getGastosEnvio(): Promise<any> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  let response = await fetch(apiEndPoint + 'pedido/gastosEnvio/', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({"direccion":localStorage.getItem("direccion")})
  }).then(resp => resp.json())
  .then(data => {
    gastosEnvio = Number(data).toFixed(2);
  });

  return response;
}

toast.configure();
const ProcesoPago:React.FC<Props> = ({cartItems}) => {
    const [pasoActual, setPasoActual] = React.useState(0);
    const siguientePaso = () => {
        setPasoActual((pasoPrevio) => pasoPrevio + 1);
      };

      const siguientePasoSiPodCalcularEnvio = async () => {
        if(localStorage.getItem("direccion")==null || localStorage.getItem("direccion")=="") {
          toast.warn("Por favor, inicie sesión con su POD para que podamos obtener su dirección", {position: toast.POSITION.TOP_CENTER})
        } else {
          let variable = await getGastosEnvio();
          setPasoActual((pasoPrevio) => pasoPrevio + 1);
        }
      };

      const steps = ["Envío", "Entrega", "Resumen", "¡Pedido Finalizado!"]
      
      const pasoAnterior = () => {
        setPasoActual((pasoPrevio) => pasoPrevio - 1);
      };

      const [deliveryCost, setDeliveryCost] = React.useState<number>(Number());
      const [address, setAddress] = React.useState("");
      const [deliveryDate, setDeliveryDate] = React.useState("");

      const getPaso = (stepIndex: number) => {
        switch (stepIndex) {
          case 0:
            condPedido=true;
            return (
              <Shipping
                cartItems={cartItems}
                siguientePaso={siguientePasoSiPodCalcularEnvio}
                setDeliveryCost={setDeliveryCost}
                deliveryCost={deliveryCost}
                setAddress={setAddress}
                
              />
            );
          case 1:
            return (
              <Delivery
                cartItems={cartItems}
                siguientePaso={siguientePaso}
                deliveryCost={gastosEnvio}
                setDeliveryCost={setDeliveryCost}
                setAddress={setAddress}
                address={address}
                setDeliveryDate={setDeliveryDate}
              />
            );
          case 2:
            
            return (
              <Review
                cartItems={cartItems}
                siguientePaso={siguientePaso}
                deliveryCost={gastosEnvio}
                setDeliveryCost={setDeliveryCost}
                setAddress={siguientePaso}
                address={address}
                deliveryDate={deliveryDate}
              />
            );
          case 3:
            if(condPedido){
              finalizarPedido(gastosEnvio,cartItems)
              condPedido=false;
            }
            return <FinalizedOrder
            cartItems={cartItems}
            siguientePaso={siguientePaso}
            deliveryCost={gastosEnvio}
            setDeliveryCost={setDeliveryCost}
            setAddress={siguientePaso}
            address={address}
            deliveryDate={deliveryDate} />;
            
        }
      };



      return (
        <React.Fragment>
           <Stepper
            activeStep={pasoActual}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Paper
          elevation = {12}
          sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}
        >
    <Container component="main" maxWidth="lg" sx={{ mb: 8 }}>

        <React.Fragment>    
              {getPaso(pasoActual)}
        </React.Fragment>
    
        </Container>
        </Paper>
        </React.Fragment>
      )
      
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl
export default ProcesoPago;
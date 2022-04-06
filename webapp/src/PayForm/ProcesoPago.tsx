import CartItem from '../CartItem/CartItem';

import * as React from "react";
//Styles
import {Wrapper} from '../Cart/Cart.styles';

//Types
import { CartItemType } from '../App';

import {Juguete} from '../shared/sharedJuguete';

import Shipping from './Shipping';
import Delivery from './Delivery';
import Review from './Review';



/*type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem:CartItemType)=> void;
    removeFromCart: (id:number) => void;aa
};*/

type Props = {
    cartItems: Juguete[];
};


const PayForm:React.FC<Props> = ({cartItems}) => {
    const [pasoActual, setPasoActual] = React.useState(0);
    const siguientePaso = () => {
        setPasoActual((pasoPrevio) => pasoPrevio + 1);
      };
      
      const pasoAnterior = () => {
        setPasoActual((pasoPrevio) => pasoPrevio - 1);
      };

      const getPaso = (stepIndex: number) => {
        switch (stepIndex) {
          case 0:
            return (
              <Shipping
                cartItems={cartItems}
                gastosEnvio={-1}
                siguientePaso={siguientePaso}
              />
            );
          case 1:
            return (
              <Delivery
              cartItems={cartItems}
                gastosEnvio={-1}
                siguientePaso={siguientePaso}
              />
            );
          case 2:
            return (
              <Review
              cartItems={cartItems}
                gastosEnvio={-1}
                siguientePaso={siguientePaso}
              />
            );
          case 3:
            return <FinalizedOrder />;
        }
      };



      return (
        <React.Fragment>    
              {getPaso(pasoActual)}
        </React.Fragment>
      
};
//El boton se utilizara para obtener el pod del usuario, faltaría la función onClickl

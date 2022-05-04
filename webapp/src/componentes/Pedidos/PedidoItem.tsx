//types
import { Juguete } from '../../shared/sharedJuguete';
import Paper from "@mui/material/Paper";
//Styles
import './pedidos.css';

/*type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void;
}*/

type Props = {
    item: Juguete;
    cantidad: number;
}


const PedidoItem: React.FC<Props> = ({ item, cantidad }) => (


    <Paper className='pedidoItem' elevation={2} sx={{ my: { xs: 4, md: 4 } }}>
        <h3>{item.nombre}: {cantidad} uds.</h3>
        <img src={item.imagen} alt={item.nombre} width="100" />
    </Paper>
)

export default PedidoItem;

/*
<div>
                <p>Cantidad: <b>{cantidad}</b></p>
                <p>Total: <b>{(cantidad * item.precio).toFixed(2)}€</b></p>
            </div>

*/
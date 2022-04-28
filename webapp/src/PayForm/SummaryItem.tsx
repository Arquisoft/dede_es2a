import Button from '@material-ui/core/Button';
//types
import {CartItemType} from '../App';
import Item from '../Item/Item';
import {Juguete} from '../shared/sharedJuguete';
import Paper from "@mui/material/Paper";
//Styles
import {Wrapper} from '../CartItem/CartItem.styles';
import { Box} from '@material-ui/core';

/*type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void;
}*/

type Props = {
    item: Juguete;
}


const SummaryItem: React.FC<Props> = ({item}) => (
    
    
    <Paper elevation = {2} sx={{ my: { xs: 4, md: 4 }}}>
            <h3>{item.nombre}</h3>
            <div >
                <p>Cantidad: <b>{item.cantidad}</b></p>
                <p>Total: <b>{(item.cantidad * item.precio).toFixed(2)}€</b></p>
            </div>

        <img src={item.imagen} alt={item.nombre} width="100"/>
        </Paper>
)

export default SummaryItem;


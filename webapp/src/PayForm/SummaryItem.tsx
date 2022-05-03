//types
import {Juguete} from '../shared/sharedJuguete';
import Paper from "@mui/material/Paper";
//Styles

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


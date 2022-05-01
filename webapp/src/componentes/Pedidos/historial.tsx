import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { Pedido } from '../../shared/sharedPedido';
import Grid from '@material-ui/core/Grid';

var correo: string;

async function getPedidos(): Promise<Pedido[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    //let response = await fetch(apiEndPoint + "usuario");
    let response = await fetch(apiEndPoint + "byUser/" + correo);
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}

const HistorialPedidos = () => {
    const { user } = useAuth0();
    correo = user?.email == undefined || user?.email == null ? "" : user?.email;
    // coger pedidos del usuario de la Base de datos
    const { data } = useQuery<Pedido[]>('pedidos', getPedidos);
    if (correo = "") {
        return (
            <div>
                <h2>Debe registrarse primero para ver su historial de pedidos</h2>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Mis Pedidos</h2>
                <p>{data?.map(pedido => (
                    <div>
                        <p>{pedido.precioFinal}</p>
                    </div>
                ))}</p>
            </div>
        );
    }
    /*
    {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
      */
}

export default HistorialPedidos;
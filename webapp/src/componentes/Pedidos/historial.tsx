import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { Pedido } from '../../shared/sharedPedido';
import PedidoItem from './PedidoItem';
import './pedidos.css';
var correo: string;
var numero: number;

async function getPedidos(): Promise<Pedido[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
    //const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-es2a-restapi.herokuapp.com/'
    let response = await fetch(apiEndPoint + "/pedido/byUser/" + correo);
    //The objects returned by the api are directly convertible to User objects
    return response.json();

}

const HistorialPedidos = () => {
    const { user } = useAuth0();
    correo = user?.email === undefined || user?.email == null ? "" : user?.email;
    // coger pedidos del usuario de la Base de datos
    const { data } = useQuery<Pedido[]>('pedidos', getPedidos);
    numero = 0;
    if (correo === '') {
        return (
            <div>
                <h2>Debe registrarse primero para ver su historial de pedidos</h2>
            </div>
        );
    } else {
        return (
            <div>
                <h1 className='mis-pedidos'>Mis Pedidos</h1>
                <p>{data?.map(pedido => (
                    <div>
                        <h2 className='numeroPedido'>{++numero}. Precio total del pedido: <b>{(pedido.precioFinal).toFixed(2)}€</b></h2>
                        {pedido.juguetes.map(item => (
                            <PedidoItem
                                key={item._id.id}
                                item={item._id}
                                cantidad={item.cantidad}
                            />
                        ))}
                    </div>
                ))}</p>
            </div>
        );
    }
    /*
    <p>Juguetes: {pedido.juguetes.map(juguete => {
                            nombre = juguete._id.nombre
                        })}{nombre}</p>

    {cartItems.map(item=>(
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}


    {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
      */
}

export default HistorialPedidos;
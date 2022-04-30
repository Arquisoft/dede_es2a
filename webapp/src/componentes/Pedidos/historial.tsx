import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { Pedido } from '../../shared/sharedPedido';

var correo: string;

async function getPedidos(): Promise<Pedido[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + "usuario");
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}

const HistorialPedidos = () => {
    const { user } = useAuth0();
    if (user?.email == null || user?.email == undefined) {
        return (
            <div>
                <h2>Debe registrarse primero para ver su historial de pedidos</h2>
            </div>
        );
    } else {
        correo = user?.email;
        let misPedidos = getPedidos();
        // coger pedidos del usuario de la Base de datos
        return (
            <div>
                <h2>Mis Pedidos</h2>
                <p>{misPedidos}</p>
            </div>
        );
    }
}

export default HistorialPedidos;
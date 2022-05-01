import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Usuario } from '../../shared/sharedUser';
import { useQuery } from 'react-query';
import Ayuda from './Ayuda';
import Item from '../../Item/Item';
import LinearProgess from '@material-ui/core/LinearProgress';

import { Juguete } from '../../shared/sharedJuguete';

var email: string;
var usuario: any;
var isAdmin: any;

async function getData(): Promise<any> {
    //const { data } = useQuery<Usuario>('usuario', checkUserInBD);
    //usuario = data;
}

export async function getJuguetes(): Promise<Juguete[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + 'juguete/withstock');
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}

export async function checkUserInBD(): Promise<Usuario[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + "usuario");
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    
    //const { data, isLoading, error } =   useQuery<Usuario[]>('us', checkUserInBD);
    //isAdmin=false;
   //console.log(data?.length);
    
    return <button className='btn btn-primary-login' id="registerButton" onClick={() => {
        loginWithRedirect();
        //if (isLoading) return <LinearProgess />;
         
        email = user?.email != null ? user?.email : "";

        console.log(email);
        localStorage.setItem("isAdmin", isAdmin);
        const localUser = localStorage.getItem("user");
        if (localUser) {
            let user = JSON.parse(localUser);
        } else {
            localStorage.setItem("user", JSON.stringify([]));
        }

    }}>Registrarse</button>;
}

export default LoginButton;
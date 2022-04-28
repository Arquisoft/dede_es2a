import { useAuth0 } from '@auth0/auth0-react';
import { Usuario } from '../../shared/sharedUser';
import { useQuery } from 'react-query';

var email: string;

async function checkUserInBD(): Promise<Usuario> {
    console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa');
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + 'usuario/' + email);
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}

const Ayuda = (correo: string) => {
    //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa'); // si
    email = correo;
    const { data } = useQuery<Usuario>('usuario', checkUserInBD);
    console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa'); // no
    return data;
}

export default Ayuda;
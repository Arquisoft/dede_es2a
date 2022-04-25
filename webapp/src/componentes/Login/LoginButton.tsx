import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Usuario } from '../../shared/sharedUser';
import { useQuery } from 'react-query';
import Ayuda from './Ayuda';

var email: string;
var usuario: any;

async function getData(): Promise<any> {
    //const { data } = useQuery<Usuario>('usuario', checkUserInBD);
    //usuario = data;
}

async function checkUserInBD(): Promise<Usuario> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + 'usuario/' + email);
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}
const LoginButton = () => {
    const { loginWithRedirect, user } = useAuth0();
    //const { data } = useQuery<Usuario>('usuario', checkUserInBD);
    return <button className='btn btn-primary-login' onClick={() => {
        loginWithRedirect();
        // console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa'); // si
        /*
        {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
            const { data, isLoading, error } = useQuery<Juguete[]>('juguetes', getJuguetes);
        */
        // comprobar si email está ya en BD 
        email = user?.email != null ? user?.email : "";
        //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa'); // si
        var us = Ayuda(email);
        console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa'); // no
        //var us = usuario as Usuario;
        // si no lo está
        // redirigir a formulario (nombre, apellidos y dni)
        if (us?.email == null) {
            //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa');
        }
        //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa');

        // se rellenen automaticamente los campos que ya existen y los que no, vacios


        // añadir usuario a BD


        // añadir usuario a sesión
        const localUser = localStorage.getItem("user");
        if (localUser) {
            let user = JSON.parse(localUser);
        } else {
            localStorage.setItem("user", JSON.stringify([]));
            localStorage.setItem("isAdmin", user?.email != null ?
                user?.email
                : ""
            );
        }

    }}>Registrarse</button>;
}

export default LoginButton;
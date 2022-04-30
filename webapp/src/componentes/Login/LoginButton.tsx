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
    const { loginWithRedirect, user } = useAuth0();

    const { data, isLoading, error } = useQuery<Usuario[]>('us', checkUserInBD);
    //const { data, isLoading, error } = useQuery<Juguete[]>('juguetes', getJuguetes);
    isAdmin = false;
    console.log(data?.length);
    /*{data?.map(item => {
        console.log("A: "+email);
        console.log("A: "+item.email);
        if(item.email == email){
            if(item.isAdmin==true)
                isAdmin=true;
            else
                isAdmin=false;
        }else
            isAdmin=false;
    })}*/

    return <button className='btn btn-primary-login' id="registerButton" onClick={() => {
        loginWithRedirect();
        if (isLoading) return <LinearProgess />;
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
        //var us = Ayuda(email);
        //var us = usuario as Usuario;
        // si no lo está
        // redirigir a formulario (nombre, apellidos y dni)
        /* if (us?.email == null) {
             //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa');
         }*/
        //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa');

        // se rellenen automaticamente los campos que ya existen y los que no, vacios


        // añadir usuario a BD


        // añadir usuario a sesión
        /*
        {data?.map(item => {
            var cond;
            console.log("A: "+email);
            console.log("A: "+item?.email);
            if(item?.email == email){
                if(item?.isAdmin==true)
                    isAdmin=true;
                else
                    isAdmin=false;
            }else
                isAdmin=false;
        })}*/
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
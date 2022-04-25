import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';


/*export async function getRolUsuario(): Promise<boolean> {
   
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint + 'usuario/' + user?.email)
     .then(resp => resp.json())
     .then(data => {
         gastosEnvio = Number(data).toFixed(2);
     });;
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}
*/

const LoginButton = () => {
    const { loginWithRedirect,user } = useAuth0();
    return <button className='btn btn-primary-login' onClick={() => {
        loginWithRedirect();

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
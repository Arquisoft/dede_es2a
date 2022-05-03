import { useAuth0 } from '@auth0/auth0-react';

/*
async function getData(): Promise<any> {
    //const { data } = useQuery<Usuario>('usuario', checkUserInBD);
    //usuario = data;
}
*/

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    
    //const { data, isLoading, error } =   useQuery<Usuario[]>('us', checkUserInBD);
    //isAdmin=false;
    //console.log(data?.length);
    
    return <button className='btn btn-primary-login' id="registerButton" onClick={() => {
        loginWithRedirect();
        const localUser = localStorage.getItem("user");
        if (localUser) {
            localStorage.setItem("sesion","true")
            JSON.parse(localUser);
        } else {
            localStorage.setItem("sesion","false")
            localStorage.setItem("user", JSON.stringify([]));
        }

    }}>Registrarse</button>;
}

export default LoginButton;
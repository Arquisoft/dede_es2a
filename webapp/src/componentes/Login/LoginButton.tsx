import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button className='btn btn-primary-login' onClick={() => {
        loginWithRedirect();
        
        const localUser = localStorage.getItem("user");
        if (localUser) {
            let user = JSON.parse(localUser);
        } else {
            localStorage.setItem("user", JSON.stringify([]));
        }

      }}>Registrarse</button>;
}

export default LoginButton;
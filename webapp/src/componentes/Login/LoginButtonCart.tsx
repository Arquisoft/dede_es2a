import { useAuth0 } from '@auth0/auth0-react';

const LoginButtonCart = () => {
    const { loginWithRedirect } = useAuth0();
    return <button className='btn btn-danger btn-lg' onClick={() => {
        loginWithRedirect()
       
        const localUser = localStorage.getItem("user");
        if (localUser) {
            localStorage.setItem("sesion","true")
            JSON.parse(localUser);
        } else {
            localStorage.setItem("sesion","false")
            localStorage.setItem("user", JSON.stringify([]));
        }
        localStorage.setItem("reload","true")    }}>Regístrese para seguir la compra</button>;
}

export default LoginButtonCart;
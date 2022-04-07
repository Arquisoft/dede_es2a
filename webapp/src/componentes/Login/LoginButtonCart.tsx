import { useAuth0 } from '@auth0/auth0-react';

const LoginButtonCart = () => {
    const { loginWithRedirect } = useAuth0();
    return <button className='btn btn-primary' onClick={() => loginWithRedirect()}>Regístrese para seguir la compra</button>;
}

export default LoginButtonCart;
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    console.log(localStorage.getItem("isAdmin"));
    return (
        <button className='btn btn-primary' onClick={() => {
            logout()
            localStorage.setItem("isAdmin","false");
        }
        }>Desconectarse</button>
    );
}

export default LogoutButton;
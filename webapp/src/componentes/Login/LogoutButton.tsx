import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <button className='btn btn-primary' onClick={() =>{
             logout()
             localStorage.setItem("isAdmin","false")
             window.location.href=("/home")
             window.location.reload()
        }
            }>Desconectarse</button>
    );
}

export default LogoutButton;
import { useAuth0 } from '@auth0/auth0-react';
import 'react-json-pretty/themes/monikai.css';

const ProfileImg = () => {
    const { user } = useAuth0();
    return (
        <div className='prof-img'>
            <img src={user?.picture} alt={user?.name} />
        </div>
    );
}

export default ProfileImg;
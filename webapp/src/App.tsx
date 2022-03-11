import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Welcome from './components/Welcome';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]); 

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

const { isAuthenticated } = useAuth0();

  
  return (
    <>
      <Container maxWidth="sm">
        <Welcome message="ASW students"/>
        {isAuthenticated ? 
          <>
          <LogoutButton />        
          </>  
          : <LoginButton />
        }
      </Container>
    </>
  );
  
}
//
export default App;

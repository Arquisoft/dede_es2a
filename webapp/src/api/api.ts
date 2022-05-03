import {User} from '../shared/shareddtypes';
import { Juguete } from '../shared/sharedJuguete';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getJuguetes(): Promise<Juguete[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  console.log(process.env.REACT_APP_API_URI)
  //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-es2a-restapi.herokuapp.com/'
  let response = await fetch(apiEndPoint + 'juguete/withstock');
  //The objects returned by the api are directly convertible to User objects
  //console.log(response.json());
  return response.json();
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}
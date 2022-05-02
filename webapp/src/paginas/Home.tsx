import { useAuth0 } from "@auth0/auth0-react";
import { Usuario } from "../shared/sharedUser";
import "./Pag.css"

// Variable para almacenar si el usuario autenticado existe o no en la bd
let userExists:boolean = false;

/**
 * Método que hace petición a restapi para comprobar si el usuario con el email especificado existe en la bd
 * @param email 
 * @returns 
 */
export async function checkUserInBDByEmail(email:string): Promise<any> {
    let response = await fetch('http://localhost:5000/usuario/'+email)
    .then(resp => resp.json())
    .then(usuario => {
      userExists = usuario.isAdmin;
      console.log(usuario.isAdmin);
      localStorage.setItem("isAdmin", usuario.isAdmin);
    });
    //The objects returned by the api are directly convertible to User objects
    return response;
}

/**
 * Método que hace petición a restapi para añadir un usuario a la bd
 * @returns 
 */
async function addUserToBD(email:string): Promise<any> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    let response = await fetch(apiEndPoint + 'usuario', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({"email":email, "isAdmin": false})
    })
  
    return response;
  }
/*
  export async function checkUserInBD(): Promise<Usuario[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
    let response = await fetch(apiEndPoint +"usuario");
    //The objects returned by the api are directly convertible to User objects
    console.log(response.json());
    return response.json();
}
*/
const Home = () => {

   
    const {isAuthenticated, user} = useAuth0();
    let usuario:Usuario;
    if(isAuthenticated){
        // comprobamos si ya existe en la bd
        let email:any = user?.email;
        checkUserInBDByEmail(email);
        if(!userExists){ // almacenamos en la base de datos
            addUserToBD(email);
        }
    }
    
    return (
        <body>
        <h1>Bienvenido</h1>
           
                <p>Esperamos que disfrutes nuestra pagina web</p>
           
        </body>
      
    )
}

export default Home;

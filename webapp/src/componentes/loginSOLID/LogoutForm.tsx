import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from '../../paginas/Home';

const LogoutForm = () => {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    /*
    sessionStorage.removeItem("webID");
    sessionStorage.removeItem("sessionID");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("organizacion");
    sessionStorage.removeItem("direccion");
    */
    // tener en cuenta que quizas hay que restaurar tambien el carrito
    navigate("/");
  });

  return <Home />;
};

export default LogoutForm;
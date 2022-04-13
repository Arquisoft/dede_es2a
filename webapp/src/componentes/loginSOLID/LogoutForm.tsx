import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from '../../paginas/Home';

const LogoutForm = () => {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("webID");
    localStorage.removeItem("sessionID");
    localStorage.removeItem("usuario");
    localStorage.removeItem("organizacion");
    localStorage.removeItem("direccion");
    // tener en cuenta que quizas hay que restaurar tambien el carrito
    navigate("/");
  });

  return <Home />;
};

export default LogoutForm;
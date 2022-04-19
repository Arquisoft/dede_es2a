
import { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";
import { handleIncomingRedirect,  onSessionRestore } from "@inrupt/solid-client-authn-browser";
import { Autocomplete, Button, Container, TextField } from "@mui/material";
import { Wrapper} from '../../App.styles';
import { useEffect } from 'react';

export default function LoginForm() {

  const navigate = useNavigate();
  const [idp, setIdp] = useState("https://broker.pod.inrupt.com/");
  const proveedores = [{ displayName: "Broker", url: "https://broker.pod.inrupt.com/" }, { displayName: "Inrupt", url: "https://inrupt.net/" },
                    {displayName: "Solid community", url: "https://solidcommunity.net/"},
                    {displayName: "Solid Web", url:"https://solidweb.org/"}]
  const { session } = useSession();
  const [UrlActual, setUrlActual] = useState("https://localhost:3000");

  useEffect(() => {
    setUrlActual(window.location.href);
  }, [setUrlActual]);

  onSessionRestore((url) => {
    if (session.info.isLoggedIn) {
      navigate(url);
    }
  });

  useEffect(() => {
    handleIncomingRedirect({
      restorePreviousSession: true
    }).then(() => {
      if (session.info.isLoggedIn) {
        localStorage.setItem("webID", session.info.webId+"");
        localStorage.setItem("sessionID", session.info.sessionId);
        navigate("/perfilPod");
      }
    })
  });

  return (
  
  );
}


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
      restorePreviousSession: false
    }).then(() => {
      if (session.info.isLoggedIn) {
        sessionStorage.setItem("webID", session.info.webId+"");
        sessionStorage.setItem("sessionID", session.info.sessionId);
      }
    })
  });

  return (
    <Container>
        <Wrapper>
        <Autocomplete
            disablePortal
            id="combo-box-providers"
            options={proveedores}
            renderInput={(params) => <TextField {...params} label="Provider:" />}
            getOptionLabel={(option) => option.displayName}
            onChange={(e, value) => {
              if (value != null)
                setIdp(value.url)
            }}
          />
          <LoginButton
            oidcIssuer={idp}
            redirectUrl={UrlActual}    
            onError={console.error}>
                <Button variant="contained">Obtener dirección </Button>
          </LoginButton>
        </Wrapper>
    </Container>
  );
}

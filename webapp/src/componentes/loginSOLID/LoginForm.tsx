
import { useState } from "react";
import { Autocomplete, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";
import { handleIncomingRedirect,  onSessionRestore } from "@inrupt/solid-client-authn-browser";
import { useEffect } from 'react';
import { Wrapper, StyledButton } from '../../App.styles';

const authOptions = { clientName: "DedeNostalgia" }; // nobre de nuestra aplicacion

export default function LoginForm() {

  const navigate = useNavigate();
  const [idp, setIdp] = useState("https://broker.pod.inrupt.com/");
  const providers = [{ displayName: "Broker", url: "https://broker.pod.inrupt.com/" }, { displayName: "Inrupt", url: "https://inrupt.net/" }]
  const { session } = useSession();

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
        navigate("/profile");
      }
    })
  });

  return (
    <Container>
        <Wrapper>
          <LoginButton
                oidcIssuer={idp}
                redirectUrl={window.location.href}
                authOptions={authOptions}>
                <Button id="LoginSolid" data-testid="button" color="primary" variant="contained">Obtener dirección</Button>
          </LoginButton>
        </Wrapper>
    </Container>
  );
}

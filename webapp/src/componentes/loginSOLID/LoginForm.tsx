
import { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { handleIncomingRedirect,  onSessionRestore } from "@inrupt/solid-client-authn-browser";
import { Autocomplete, Button, Container, TextField } from "@mui/material";
import { Wrapper} from '../../App.styles';
import { useEffect } from 'react';
import {CombinedDataProvider, LogoutButton, Text  } from "@inrupt/solid-ui-react";
import {  Card, CardContent, Typography } from "@material-ui/core";
import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    Thing,
} from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

  const navigate = useNavigate();
  const [idp, setIdp] = useState("https://inrupt.net/");
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


  async function obtenerInformacionPod(webID: string): Promise<string[]> {
    //Nos quedamos con la primera que nos aporta la info de la tarjeta
    let profileDocumentURI = webID.split("#")[0]; 
    //Obtenemos los datos de la tarjeta
    let myDataset = await getSolidDataset(profileDocumentURI);
    // obtenemos lo que buscamos del conjunto de datos
    let profile = getThing(myDataset, webID); 
    // Obtenemos la informacion especifica del POD
    let usuario = getStringNoLocale(profile as Thing, FOAF.name.iri.value) as string;
    let organizacion = getStringNoLocale(profile as Thing, FOAF.name.iri.value) as string;
    let direccion = getStringNoLocale(profile as Thing, VCARD.note) as string;
    return [usuario, organizacion, direccion];
};

  useEffect(() => {
    handleIncomingRedirect({
      restorePreviousSession: false
    }).then(() => {
      if (session.info.isLoggedIn) {
        localStorage.setItem("webID", session.info.webId+"");
        localStorage.setItem("sessionID", session.info.sessionId);    
        obtenerInformacionPod(session.info.webId+"").then((result) => {
            localStorage.setItem("usuario", result[0]);
            localStorage.setItem("organizacion", result[1]);
            localStorage.setItem("direccion", result[2]);
        });
        
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
                <Button  variant="contained">Obtener dirección </Button>
          </LoginButton>
        </Wrapper>
    </Container>
  );
}

import { useSession, CombinedDataProvider, LogoutButton, Text  } from "@inrupt/solid-ui-react";
import { Button, Card, CardContent, Container, Typography } from "@material-ui/core";
import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    Thing,
} from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { Grid } from "@mui/material";

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


export default function Profile() {
    const { session } = useSession();
    

    obtenerInformacionPod(session.info.webId+"").then((result) => {
        localStorage.setItem("usuario", result[0]);
        localStorage.setItem("organizacion", result[1]);
        localStorage.setItem("direccion", result[2]);
    });

    return (
        <body>
        <Container id="profileCard" fixed>
        {session.info.webId ? (
            <CombinedDataProvider 
            datasetUrl={session.info.webId} 
            thingUrl={session.info.webId}>
            <Card style={{ maxWidth: 1300 }}>
            <CardContent>
                <div className="cardContent">
                <Typography gutterBottom variant="h4" component="h1" id="solidName">
                <p >{localStorage.getItem("direccion")}</p>
                </Typography>
                </div>
                <div className="cardContent">
                <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
                <Text property={VCARD.organization_name.iri.value} />
                </Typography>
                <Typography gutterBottom variant="h4" component="h3">
                {/* Para obtener la direccion */}
                <Text id= "direction" property={VCARD.note.iri.value} />
                </Typography>
                </div>
            </CardContent>
            </Card>
            </CombinedDataProvider>
        ): null } 
                
        <Grid id="solidButtons" container>
            <Grid item>
            <LogoutButton >
                <Button id="logoutButton" href="http://localhost:3000" variant="contained" color="primary">
                Logout
                </Button>
            </LogoutButton>
            </Grid>
        </Grid>
        </Container>
        </body>
    );
}

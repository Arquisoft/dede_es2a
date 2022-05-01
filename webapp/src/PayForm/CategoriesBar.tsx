import React from 'react';
import { Link } from '@mui/material';
import styled from 'styled-components';
import './categories.css';
import { Juguete } from '../shared/sharedJuguete';
const NavigationWrapper = styled.nav`
 display: flex;
 width: 70%;
 margin:24px auto 16px;
 justify-content: space-between;
`

const StyledLink = styled.a`
color: #ffffff;
`

const Separator = styled.div`
 height: 5px;
 width: 70%;
 border-radius: 14px;
 align-content: center;
 margin: 5px auto;
 background-color: #d3707c;
`

const CategoriesBar = ()=> {
    let juguetes:Juguete[];

    return(
        <>
    <NavigationWrapper>
        <StyledLink className="linkCategorie" href="/nostalgia" >Nostalgia</StyledLink>
        <StyledLink className="linkCategorie" href="/vehiculo">Vehiculos</StyledLink>
        <StyledLink className="linkCategorie" href="/musical">Musicales</StyledLink>
        <StyledLink className="linkCategorie" href="/peluche">Peluche</StyledLink>
        <StyledLink className="linkCategorie" href="/bebes">Bebés</StyledLink>
        <StyledLink className="linkCategorie" href="/otros">Otros</StyledLink>
       
    </NavigationWrapper>
    <Separator/>
    </>
    );
}
export default CategoriesBar;
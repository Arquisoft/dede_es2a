import React from 'react';
import { Link } from '@mui/material';
import styled from 'styled-components';
import './categories.css';
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
    return(
        <>
    <NavigationWrapper>
        <StyledLink className="linkCategorie" href="/juguete/categoria/nostalgia">Nostalgia</StyledLink>
        <StyledLink className="linkCategorie" href="/juguete/categoria/nostalgia">Vehiculos</StyledLink>
        <StyledLink className="linkCategorie" href="/juguete/categoria/nostalgia">Aire libre</StyledLink>
        <StyledLink className="linkCategorie" href="/juguete/categoria/nostalgia">Algo</StyledLink>
        <StyledLink className="linkCategorie" href="/juguete/categoria/nostalgia">Otros</StyledLink>
        <StyledLink className="linkCategorie" href="/productos">Productos</StyledLink>
    </NavigationWrapper>
    <Separator/>
    </>
    );
}
export default CategoriesBar;
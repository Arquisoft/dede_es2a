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

const Separator = styled.hr`
 height: 10%;
 width: 70%;
 border-radius: 14px;
 margin: 0 auto;
 background-color: #d1626f;
`


const CategoriesBar = ()=> {
    return(
        <>
    <NavigationWrapper>
        <Link className="linkCategorie" href="/juguete/categoria/nostalgia">Nostalgia</Link>
        <Link className="linkCategorie" href="/productos">Productos</Link>
    </NavigationWrapper>
    <Separator/>
    </>
    );
}
export default CategoriesBar;
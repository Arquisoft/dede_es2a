import React from 'react';
import { Link } from '@mui/material';
import styled from 'styled-components';
const NavigationWrapper = styled.nav`
 displayf: flex;
 width: 70%;
 margin:24px auto 16px;
 justify-content: space-between;
`

const CategoriesBar = ()=> {
    return(
    <NavigationWrapper>
        <Link href="/juguete/nostalgia">Nostalgia</Link>
        <Link href="/productos">Productos</Link>
    </NavigationWrapper>
    );
}
export default CategoriesBar;
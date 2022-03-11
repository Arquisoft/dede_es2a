import React, {Component } from 'react';
import {MenuItems} from "./Menitems"
import './Navbar.css'
import Button from "../Button"
import {Wrapper} from '../../Item/Item.styles';




type Props = {
    state :{clicked:false};
    handleClick:any;
}

//Así creamos un elemento reactivo con las propiedades especificadas
const Navbar: React.FC<Props> = ({state, handleClick})=>(
  
    <Wrapper>
       <nav className="NavbarItems">
                <h1 className ="navbar-logo">React<i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={handleClick}>
                     <i className={state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>   
                </div>
                <ul className={state.clicked ? 'nav-menu active' : 
                'nav-menu'}>
                    {MenuItems.map((item,index)=>{
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}  
                </ul>
                
            </nav>
    </Wrapper>
)



export default Navbar;
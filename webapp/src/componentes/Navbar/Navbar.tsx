import { Component } from 'react';
import { MenuItems } from "./Menitems"
import { MenuItemsAdmin } from "./MenitemsAdmin"
import './Navbar.css'
import LoginButton from '../Login/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Login/LogoutButton';
import ProfileImg from '../Login/ProfileImg';
import ProfileName from '../Login/ProfileName';


const Navbar = () => {
    const { isAuthenticated } = useAuth0();
    let state = { clicked: false };
    const handleClick = () => {
        state = { clicked: !state.clicked }
    }
    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">DeNostalgia<i className="fab fa-react"></i></h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            {
                localStorage.getItem("isAdmin")=="true" ? // isAdmin ?
                    <ul className={state.clicked ? 'nav-menu active' :
                        'nav-menu'}>
                        {MenuItemsAdmin.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url}>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <ul className={state.clicked ? 'nav-menu active' :
                        'nav-menu'}>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url}>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
            }

            {
                isAuthenticated ? <LogoutButton /> : <LoginButton />
            }
            {
                isAuthenticated ? <ProfileName /> : <></>
            }

        </nav>
    )
}

export default Navbar;
/*
class Navbar extends Component {

    state = { clicked: false }
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">React<i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' :
                    'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <LoginButton />
            </nav>
        )
    }
}

export default Navbar
*/
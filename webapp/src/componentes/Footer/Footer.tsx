import React from 'react';
import "./Footer.css"

const Footer = () =>{
    return (
        <div className='main-footer'>
            <div className='container'>
                <div className='row'>
                    {}
                    <div className='col'>
                        <h4>Uniovi</h4>
                        <ul className='list-unstyled'>
                            <li>Arquitectura del Software</li>
                        </ul>
                    </div>
                    {}
                    <div className='col'>
                        <h4>Contáctanos</h4>
                        <ul className='list-unstyled'>
                            <li>DeNostalgia@gmail.com</li>
                            <li>98553XXXX</li>
                        </ul>
                    </div>
                    {}
                    <div className='col'>
                        <h4>Ubicación</h4>
                        <ul className='list-unstyled'>
                            <li>Calle Valdés Salas,</li>
                            <li>11, 33007 Oviedo,</li>
                            <li>Asturias</li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <p className='col-sm'>
                        &copy;{new Date().getFullYear} DeNostalgia | All right reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
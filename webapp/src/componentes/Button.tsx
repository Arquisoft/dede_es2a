import React from 'react'
import './Button.css'


const STYLES=[
    'btn--primary',
    'btn--outline'
]

const SIZES=[
    'btn--medium',
    'btn--large'
]




type Props = {
    children: any;
    type: any;
    onClick: any;
    buttonStyle: any;
    buttonSize: any;
    
}


//Así creamos un elemento reactivo con las propiedades especificadas
const Button: React.FC<Props> = ({children, type, onClick, buttonStyle, buttonSize})=> {
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle: STYLES[0];
    const checkButtonSizes=SIZES.includes(buttonSize) ? buttonSize: SIZES[0];

   return( <button className={'btn ${checkButtonStyle} ${checkButtonSizes}'}
         onClick={onClick} type={type}>
            {children}
        </button>
   );
}

export default Button;



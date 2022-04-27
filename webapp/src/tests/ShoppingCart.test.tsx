
import { useState } from 'react';
import { useQuery } from 'react-query';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render} from '@testing-library/react'
import { Juguete } from '.././shared/sharedJuguete';
import Cart from '.././Cart/Cart'
import {prettyDOM} from '@testing-library/dom';



test('cart is rendered', ()=> {
  const juguete = {
    id:0,
    nombre: "Prueba",
    descripcion: "Prueba",
    precio:2,
    imagen:"ninguna",
    categoria:"Pruebas",
    cantidad:2,
  }
const juguetes:Juguete[] = [juguete];
const component = render(<Cart cartItems={juguetes} addToCart={() => {}} removeFromCart={() => {}}/>)

//Para mostrar el contenido del componente


/* Para mostrar un componente de manera legible por cosola
const li = component.container.querySelector('li');
console.log(prettyDOM(li));
*/

//Son dos maneras de hacerlo
//component.getByText(juguete.nombre);
//component.getByText(juguete.descripcion);
expect(component.container).toHaveTextContent(juguete.nombre);
expect(component.container).toHaveTextContent(juguete.descripcion);

})


test('clicking the - button on the shopping cart',() =>{
  const juguete = {
    id:0,
    nombre: "Prueba",
    descripcion: "Prueba",
    precio:2,
    imagen:"ninguna",
    categoria:"Pruebas",
    cantidad:2,
  }
  const juguetes:Juguete[] = [juguete];

  //Vamos a comprobar que se puede pulsar el boton "-" utilizando jest.fn() y pasandole esa funcion como parametro al carrito como si fuera el removeFromCart
  //Despues podemos mirar si efectivamente fue clickada o no
  const mockHandler = jest.fn();

  const component = render(<Cart cartItems={juguetes} addToCart={() => {}} removeFromCart={mockHandler}/>)
  const button = component.container.querySelector('button');

if (button !== null) {
      fireEvent.click(button);
}
  expect(mockHandler).toHaveBeenCalledTimes(1)

})

test('clicking the + button on the shopping cart',() =>{
  const juguete = {
    id:0,
    nombre: "Prueba",
    descripcion: "Prueba",
    precio:2,
    imagen:"ninguna",
    categoria:"Pruebas",
    cantidad:2,
  }
  const juguetes:Juguete[] = [juguete];

  //Vamos a comprobar que se puede pulsar el boton "-" utilizando jest.fn() y pasandole esa funcion como parametro al carrito como si fuera el removeFromCart
  //Despues podemos mirar si efectivamente fue clickada o no
  const mockHandler = jest.fn();

  const component = render(<Cart cartItems={juguetes} addToCart={mockHandler} removeFromCart={ () => {}}/>)
  const button = component.container.querySelectorAll('button');

if (button[1] !== null) {
      fireEvent.click(button[1]);
}
  expect(mockHandler).toHaveBeenCalledTimes(1)

})




 

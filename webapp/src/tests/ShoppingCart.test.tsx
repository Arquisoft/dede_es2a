
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

  
  //Esto nos va adecir si el carrito esta abierto, va a ser un booleano (cartOpen) que se inicia en false y que se puede modificar con la funcion  "setCartOpen"
  const [cartOpen, setCartOpen] = useState(false);

  //Inicialmente vamos a tener un array vacio de CartItemType que va a ser cartItems
  //const[cartItems, setCartItems] = useState([] as CartItemType[]);
  const[cartItems, setCartItems] = useState([] as Juguete[]);

  
  //--------------------------------------------------------------------------------
  console.log(data);


  /*const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item)=>ack+item.amount,0);*/ 

  const getTotalItems = (items: Juguete[]) => 
  items.reduce((ack: number, item)=>ack+item.cantidad,0);


  const handleAddToCart = (clickedItem: Juguete) => {
    //"prev" es el estado previo del carrito, justo antes de añadir un producto
    setCartItems(prev => {
      //1. Teniamos ya el producto en el carrito
      const isItemInCart = prev.find(item => item.id ===clickedItem.id)
      if(isItemInCart) {
        return prev.map(item=>(
          item.id===clickedItem.id
          //Cogemos el objeto viejo y le aumentamos la amount. Si no tenemos el item en el carrito, el item viejo se devuelve tal y como estaba(pòrque no es el mismo)
            ? {...item, cantidad: item.cantidad+1}
            : item
        ))
      }
      //2. El producto no está en el carrito, tenemos que añadirlo como uno nuevo
      //Entonces lo que hacemos es retornar el estado previo (prev) y le añadimos una nueva casilla que tienen el clickedItem con un amount de 1
      return [...prev, {...clickedItem, cantidad:1}];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev=>(
      prev.reduce((ack, item)=> {
        if(item.id===id){
          if(item.cantidad===1) return ack;
          return [...ack, {...item, amount:item.cantidad - 1}]
        } else {
          return [...ack, item];
        }
      },[] as Juguete[]) 
    ))

  };

  //Vamos a comprobar que se puede pulsar el boton "-" utilizando jest.fn() y pasandole esa funcion como parametro al carrito como si fuera el removeFromCart
  //Despues podemos mirar si efectivamente fue clickada o no
  const mockHandler = jest.fn();

  const component = render(<Cart cartItems={juguetes} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>)
  const button = component.container.querySelectorAll('button');

if (button[1] !== null) {
      fireEvent.click(button[1]);
}
  expect(mockHandler).toHaveBeenCalledTimes(1)

})


 

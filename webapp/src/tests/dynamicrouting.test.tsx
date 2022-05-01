import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginButton from '../componentes/Login/LoginButton';
import LogoutButton from '../componentes/Login/LogoutButton'
import Navbar from '../componentes/Navbar/Navbar';
import Footer from '../componentes/Footer/Footer';
import Home from '../paginas/Home';
import ContactUs from '../paginas/ContactUs';
import App from '../App';
import FinalizedOrder from '../PayForm/FinalizedOrder';
import ProcesoPago from '../PayForm/ProcesoPago';
import Item from '../Item/Item';
import { Juguete } from '../shared/sharedJuguete';

test('navbar is rendered', () => {
  const component = render(<Navbar/>)
  expect(component.container).toHaveTextContent('DeNostalgia')
})

test('home is rendered', () => {
  const component = render(<Home/>)
  expect(component.container).toHaveTextContent('Bienvenido')
})

test('ContactUs is rendered', () => {
  const component = render(<ContactUs/>)
  expect(component.container).toHaveTextContent('Contáctanos')
})

test('footer is rendered', () => {
  const component = render(<Footer/>)

  expect(component.container).toHaveTextContent('Uniovi')
})

test('Finalized Order is rendered', () => {
  const component = render(<FinalizedOrder/>)

  expect(component.container).toHaveTextContent('finalizado')
})


test('Pay form is rendered', () => {
  const component = render(<ProcesoPago cartItems={[]}/>)

  expect(component.container).toHaveTextContent('Envío')

})


test('Item is rendered', () => {
  const component = render(<Item item={{
    id: 0,
    nombre: 'Pikachu',
    descripcion: 'juguete',
    precio: 0,
    imagen: '',
    categoria: 'nostalgia',
    cantidad: 0
  }} handleAddToCart={function (clickedItem: Juguete): void {
  } }/>)
  expect(component.container).toHaveTextContent('Pikachu')
  
})

/*
test('clicking home nav-button', () => {
  const component = render(<Navbar/>)

  const mockHandler = jest.fn()
  //const component2=render(<App/>).container
  const button = component.container.querySelectorAll("a[href='home']");
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(1)
  //expect(component.container).toHaveTextContent('Bienvenido')
})
*/
//Falta hacer que funcione render(<App>)
/*
test('clicking products nav-button', () => {
  const component = render(<Navbar/>)

  const mockHandler = jest.fn()
  const button = component.getByText('Productos')
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('clicking contact nav-button', () => {
  const component = render(<Navbar/>)

  const mockHandler = jest.fn()
  const button = component.getByText('Contáctanos')
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('clicking login button', () => {
  const component = render(<LoginButton/>)

  const mockHandler = jest.fn()

  const button = component.getByText('Registrarse')
  fireEvent.click(button)
  
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
*/

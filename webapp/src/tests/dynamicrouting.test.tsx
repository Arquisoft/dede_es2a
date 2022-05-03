import '@testing-library/jest-dom/extend-expect';
import { act, screen } from "@testing-library/react";
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginButton from '../componentes/Login/LoginButton';
import LogoutButton from '../componentes/Login/LogoutButton'
import Navbar from '../componentes/Navbar/Navbar';
import Footer from '../componentes/Footer/Footer';
import Home from '../paginas/Home';
import ContactUs from '../paginas/ContactUs';
import App from '../App';
import Item from '../Item/Item';
import { Juguete } from '../shared/sharedJuguete';
import ProcesoPago from '../PayForm/ProcesoPago';
import Shipping from '../PayForm/Shipping';
import Delivery from '../PayForm/Delivery';
import Review from '../PayForm/Review';
import FinalizedOrder from '../PayForm/FinalizedOrder';
import PedidoItem from '../componentes/Pedidos/PedidoItem';
import HistorialPedidos from '../componentes/Pedidos/historial';
import LoginForm from '../componentes/loginSOLID/LoginForm';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import LogoutForm from '../componentes/loginSOLID/LogoutForm';
import AddForm from '../componentes/nuevoProducto/nuevoProducto';
import EditForm from '../componentes/editarProducto/editarProducto';
const queryClient = new QueryClient()
const domain = 'dev-o-6umpor.us.auth0.com';
const client_id = 'gVZPxJXH5Lx34bGRc8XHl6siZ4lJ72E0';
test('navbar is rendered', () => {
  const component = render(<Navbar />)
  expect(component.container).toHaveTextContent('Home')
})

test('navbar is rendered', () => {
  localStorage.setItem("isAdmin", "true")
  const component = render(<Navbar />)
  expect(component.container).toHaveTextContent('Productos')
  console.log(component.getAllByText)
  localStorage.clear();
})

test('home is rendered', () => {
  localStorage.setItem("user", "ejemplo2@gmail.com")
  localStorage.setItem("sesion", "true")
  const component = render(<Home />)
  expect(component.container).toHaveTextContent('Bienvenido')
  localStorage.clear();
})

test('ContactUs is rendered', () => {
  const component = render(<ContactUs />)
  expect(component.container).toHaveTextContent('Contáctanos')
})

test('footer is rendered', () => {
  const component = render(<Footer />)

  expect(component.container).toHaveTextContent('Uniovi')
})
test('Delivery is rendered', () => {
  const component = render(<Delivery cartItems={[]} setDeliveryCost={function (n: number): void {
  }} deliveryCost={0} siguientePaso={function (): void {
  }} setAddress={function (n: string): void {
  }} address={''} setDeliveryDate={function (n: string): void {
  }} />)

test('clicking home nav-button', () => {
  const component = render(<Navbar/>)

  const mockHandler = jest.fn()
  //const component2=render(<App/>).container
  const button = component.container.querySelectorAll("a[href='home']");
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(1)
  //expect(component.container).toHaveTextContent('Bienvenido')
})

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

*/

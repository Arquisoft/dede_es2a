import '@testing-library/jest-dom/extend-expect';
import { act, screen } from "@testing-library/react";
import {fireEvent, render} from '@testing-library/react';
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
const queryClient = new QueryClient()
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
test('Delivery is rendered', () => {
  const component = render(<Delivery cartItems={[]} setDeliveryCost={function (n: number): void {
  } } deliveryCost={0} siguientePaso={function (): void {
  } } setAddress={function (n: string): void {
  } } address={''} setDeliveryDate={function (n: string): void {
  } } />)

  expect(component.container).toHaveTextContent('Resumen')
})
test('Review is rendered', () => {
  const component = render(<Review cartItems={[]} setDeliveryCost={function (n: number): void {
  } } deliveryCost={0} siguientePaso={function (): void {
  } } setAddress={function (n: string): void {
  } } address={''} deliveryDate={''}  />)

  expect(component.container).toHaveTextContent('Entrega')
})

test('Finalized ordder is rendered', () => {
  const component = render(<FinalizedOrder  />)

  expect(component.container).toHaveTextContent('finalizado')
})

test('PedidoItem order is rendered', () => {
  const component = render(<PedidoItem item={{
    id: 0,
    nombre: 'Pikachu',
    descripcion: 'juguete',
    precio: 0,
    imagen: '',
    categoria: 'nostalgia',
    cantidad: 2
  }} cantidad={2}  />)

  expect(component.container).toHaveTextContent('Pikachu')
})


test('Finalized order is rendered', () => {
  const component = render(<FinalizedOrder  />)

  expect(component.container).toHaveTextContent('finalizado')
})
test('Logout button is rendered', () => {
  const component = render(<LogoutButton  />)

  expect(component.container).toHaveTextContent('Desconectarse')
})

test('App is rendered', async () => {
  const component = await act(async () => {render( <QueryClientProvider client={queryClient}  contextSharing={true}><App/></QueryClientProvider>)  });
  //expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByTestId("cargando")).toBeInTheDocument();
})

 test('Item is rendered', () => {
  const queryClient = new QueryClient()
  const app = render(  <QueryClientProvider client={queryClient}><App/></QueryClientProvider>)
  const component = render(   <BrowserRouter><Item item={{
    id: 0,
    nombre: 'Pikachu',
    descripcion: 'juguete',
    precio: 2,
    imagen: '',
    categoria: 'nostalgia',
    cantidad: 1
  }} handleAddToCart={function (clickedItem: Juguete): void {
  } }/></BrowserRouter>)
  expect(component.container).toHaveTextContent('Pikachu')
  expect(component.container).toHaveTextContent('Añadir al carrito')
  const button = component.container.querySelector('button');
  button!.click();
}) 


/*  test('ProcesoPago is rendered', async () => {
  const component = render(<ProcesoPago cartItems={[]}/>)

  expect(component.container).toHaveTextContent('Envío')
  await act(async () => {
    fireEvent.click(screen.getByTestId("botonDireccion"));
  });

  expect(component.container).toHaveTextContent('Evnío')

  await act(async () => {
    fireEvent.click(screen.getByTestId("botonSiguiente"));
  });
  expect(component.container).toHaveTextContent('Envío')
  await act(async () => {
    fireEvent.click(screen.getByTestId("botonSiguiente"));
  });
  expect(component.container).toHaveTextContent('Envío')
  await act(async () => {
    fireEvent.click(screen.getByTestId("botonFinalizarPedido"));
  });

})  */

test('Shipping is rendered', () => {
  const component = render(<Shipping cartItems={[]} setDeliveryCost={function (n: number): void {
  } } deliveryCost={0} siguientePaso={function (): void {
  } } setAddress={function (n: string): void {
  } } />)

  expect(component.container).toHaveTextContent('Resumen')
})


test('Historial pedidos is rendered', () => {
  const component = render(<QueryClientProvider client={queryClient}><HistorialPedidos  /></QueryClientProvider>)

  expect(component.container).toHaveTextContent('pedidos')
})

/*
test('Login button is rendered', async () => {
  const component = render(<LoginButton  />)

  expect(component.container).toHaveTextContent('Registrarse')
  await act(async () => {
    fireEvent.click(component.container.querySelector("#registerButton")!);
  });

  expect(screen.getByText("Registrarse")).toBeInTheDocument();
})
*/

test('Login form is rendered', () => {
  const component = render(<LoginForm  />)

  expect(component.container).toHaveTextContent('Obtener dirección')
})

test('Logout form is rendered', () => {
  const component = render(<LogoutForm  />)

  expect(component.container).toHaveTextContent('Bienvenido')
})



/*
test('clicking home nav-button', () => {
  const component = render(<Navbar/>)

  const mockHandler = jest.fn()
  //const component2=render(<App/>).container
  const button = component.getByText('Home')
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

import { useState } from 'react';
import { useQuery } from 'react-query';

//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './componentes/Navbar/Navbar';
//import Juguete from '../../../restapi/models/Juguete';
import { Juguete } from './shared/sharedJuguete';
import Footer from './componentes/Footer/Footer';
import Drawer from '@material-ui/core/Drawer';
import LinearProgess from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Home from './paginas/Home';
import ContactUs from './paginas/ContactUs';
//Styles
import { Wrapper, StyledButton } from './App.styles';


//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

/*
export type Juguete = {
  id:number;
  name: string;
  description: string;
  precio:number;
  imagen:string;
  categoria:string;
  cantidad:number;
}
*/

// AÑADIDO---------------------------------------------------------------------------------------------
// Petición para obtener todos los juguetes de la base de datos
export async function getJuguetes():Promise<Juguete[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  let response = await fetch(apiEndPoint+'juguete/withstock');
  //The objects returned by the api are directly convertible to User objects
  //console.log(response.json());
  return response.json();
}
/*Tambien se ha añadido la entidad compartida 'Juguete' en la carpeta shared, creando un type con el esquema de juguete
en la BD y exportando para poder usarlo desde fuera*/
//--------------------------------------------------------------------------------------------------------

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {

  //Esto nos va adecir si el carrito esta abierto, va a ser un booleano (cartOpen) que se inicia en false y que se puede modificar con la funcion  "setCartOpen"
  const [cartOpen, setCartOpen] = useState(false);

  //Inicialmente vamos a tener un array vacio de CartItemType que va a ser cartItems
  //const[cartItems, setCartItems] = useState([] as CartItemType[]);
  const[cartItems, setCartItems] = useState([] as Juguete[]);

  //const {data, isLoading, error} =useQuery<CartItemType[]>('products', getProducts);
  //AÑADIDO----------------------------------------------------------------------
  const {data, isLoading, error} =useQuery<Juguete[]>('juguetes', getJuguetes);
  
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
      const isItemInCart = prev.find(item => item.nombre ===clickedItem.nombre)
      if(isItemInCart) {
        return prev.map(item=>(
          item.nombre===clickedItem.nombre
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

  const handleRemoveFromCart = (nombre: string) => {
    setCartItems(prev=>(
      prev.reduce((ack, item)=> {
        if(item.nombre===nombre ){
          if(item.cantidad===1)return ack;
          return [...ack, {...item, cantidad:item.cantidad - 1}]
        } else {
          return [...ack, item];
        }
      },[] as Juguete[]) 
    ))

  };

  /*const handleAddToCart = (clickedItem: CartItemType) => {
    //"prev" es el estado previo del carrito, justo antes de añadir un producto
    setCartItems(prev => {
      //1. Teniamos ya el producto en el carrito
      const isItemInCart = prev.find(item => item.id ===clickedItem.id)
      if(isItemInCart) {
        return prev.map(item=>(
          item.id===clickedItem.id
          //Cogemos el objeto viejo y le aumentamos la amount. Si no tenemos el item en el carrito, el item viejo se devuelve tal y como estaba(pòrque no es el mismo)
            ? {...item, amount: item.amount+1}
            : item
        ))
      }
      //2. El producto no está en el carrito, tenemos que añadirlo como uno nuevo
      //Entonces lo que hacemos es retornar el estado previo (prev) y le añadimos una nueva casilla que tienen el clickedItem con un amount de 1
      return [...prev, {...clickedItem, amount:1}];
    })
  };*/

  /*const handleRemoveFromCart = (id: number) => {
    setCartItems(prev=>(
      prev.reduce((ack, item)=> {
        if(item.id===id){
          if(item.amount===1) return ack;
          return [...ack, {...item, amount:item.amount - 1}]
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ))

  };*/

  //Coloca una barra de carga cuando la página está cargando
  if (isLoading) return <LinearProgess />;
  if (error) return <div>Algo ha fallado</div>;

  return (
    <div className='page-container'>
    <Wrapper>
      <div className='content-wrap'>
        <Navbar />
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer />
    </Wrapper>
    </div>
  );

};



 const vista =()=>{
   return(
     <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={
          <Wrapper>
            <Navbar/>
            <Home/>
            <Footer/>
          </Wrapper>
        }
        />

        <Route path="/productos" element={<App/>}/>

        <Route path="/contactanos" element={
           <Wrapper>
            <Navbar/>
            <ContactUs/>
            <Footer/>
         </Wrapper>
        }/>
      </Routes>
    </BrowserRouter>
   </>)
 }

export default vista;

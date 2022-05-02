import { useQuery } from 'react-query';


import { useEffect, useState } from "react"

//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import HistorialPedidos from './componentes/Pedidos/historial';
//Styles
import { Wrapper, StyledButton } from './App.styles';
//import Profile from './componentes/loginSOLID/Profile';
import LoginForm from './componentes/loginSOLID/LoginForm';
import LogoutForm from './componentes/loginSOLID/LogoutForm';
import ProcesoPago from './PayForm/ProcesoPago';
import EditForm from './componentes/editarProducto/editarProducto';
import CategoriesBar from './PayForm/CategoriesBar';

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
export async function getJuguetes(): Promise<Juguete[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
  let response = await fetch(apiEndPoint + 'juguete/withstock');
  //The objects returned by the api are directly convertible to User objects
  //console.log(response.json());
  return response.json();
}

export async function getJuguetesCategoria(): Promise<Juguete[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  //const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en2a-restapi.herokuapp.com'
  let response = await fetch(apiEndPoint + 'juguete/categoria/nostalgia');
  //The objects returned by the api are directly convertible to User objects
  //console.log(response.json());
  return response.json();
}
/*Tambien se ha añadido la entidad compartida 'Juguete' en la carpeta shared, creando un type con el esquema de juguete
en la BD y exportando para poder usarlo desde fuera*/
//--------------------------------------------------------------------------------------------------------


const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  //Inicialmente vamos a tener un array vacio de CartItemType que va a ser cartItems
  //const[cartItems, setCartItems] = useState([] as CartItemType[]);
  const [cartItems, setCartItems] = useState([] as Juguete[]);


  //const {data, isLoading, error} =useQuery<CartItemType[]>('products', getProducts);
  //AÑADIDO----------------------------------------------------------------------
  const { data, isLoading } = useQuery<Juguete[]>('juguetes', getJuguetes);


  useEffect(() => {
    // Aqui meter tambien las cosas de usuario
    /*
    const localUser = localStorage.getItem("user");
    if (localUser) {
      let user = JSON.parse(localUser);
    } else {
      localStorage.setItem("user", JSON.stringify([]));
    }
    */
    // Carrito
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      let cart: Juguete[] = JSON.parse(localCart);
      setCartItems(cart);
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


  const getTotalItems = (items: Juguete[]) =>
    items.reduce((ack: number, item) => ack + item.cantidad, 0);


  const handleAddToCart = (clickedItem: Juguete) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    //"prev" es el estado previo del carrito, justo antes de añadir un producto
    setCartItems(prev => {
      //1. Teniamos ya el producto en el carrito
      const isItemInCart = prev.find(item => item.nombre === clickedItem.nombre)
      if (isItemInCart) {
        var mapeadoCarrito = prev.map(item => (
          item.nombre === clickedItem.nombre
            //Cogemos el objeto viejo y le aumentamos la amount. Si no tenemos el item en el carrito, el item viejo se devuelve tal y como estaba(pòrque no es el mismo)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ))
        return mapeadoCarrito;
      }
      //2. El producto no está en el carrito, tenemos que añadirlo como uno nuevo
      //Entonces lo que hacemos es retornar el estado previo (prev) y le añadimos una nueva casilla que tienen el clickedItem con un amount de 1
      // var mapeadoCarrito = [...prev, { ...clickedItem, cantidad: 1 }];
      mapeadoCarrito = [...prev, { ...clickedItem, cantidad: 1 }];
      return mapeadoCarrito;
    })

  };

  const handleRemoveFromCart = (nombre: string) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.nombre === nombre) {
          if (item.cantidad === 1) return ack;
          var mc = [...ack, { ...item, cantidad: item.cantidad - 1 }]
          return mc;
        } else {
          // var mc = [...ack, item];
          mc = [...ack, item];
          return mc;
        }
      }, [] as Juguete[])
    ))
  };


  //Coloca una barra de carga cuando la página está cargando
  if (isLoading) return <LinearProgess />;
  //if (error) return <div>Algo ha fallado</div>;

  //console.log('aaaaaaaaaaa \n aaaaaaaaaaaa \n aaaaaaaaaaaaaaa');

  return (
    <>
      <Wrapper>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={

              <Home />
            }
            />
            <Route path="/nostalgia" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => {
                      return item.categoria === "nostalgia" ?
                        <Grid item key={item.id} xs={12} sm={4}>
                          <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                        :
                        <></>
                    })}
                  </Grid>
                </div>
              </div>
            }
            />

            <Route path="/vehiculo" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => {
                      return item.categoria === "vehiculo" ?
                        <Grid item key={item.id} xs={12} sm={4}>
                          <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                        :
                        <></>
                    })}
                  </Grid>
                </div>
              </div>
            }
            />
            <Route path="/peluche" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => {
                      return item.categoria === "peluche" ?
                        <Grid item key={item.id} xs={12} sm={4}>
                          <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                        :
                        <></>
                    })}
                  </Grid>
                </div>
              </div>
            }
            />
            <Route path="/musical" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => {
                      return item.categoria === "musical" ?
                        <Grid item key={item.id} xs={12} sm={4}>
                          <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                        :
                        <></>
                    })}
                  </Grid>
                </div>
              </div>
            }
            />
            <Route path="/bebes" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => {
                      return item.categoria === "bebes" ?
                        <Grid item key={item.id} xs={12} sm={4}>
                          <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                        :
                        <></>
                    })}
                  </Grid>
                </div>
              </div>
            }
            />
            <Route path="/otros" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => {
                      return item.categoria === "otros" ?
                        <Grid item key={item.id} xs={12} sm={4}>
                          <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                        :
                        <></>
                    })}
                  </Grid>
                </div>
              </div>
            }
            />

            <Route path="/productos" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  <CategoriesBar />
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => (
                      <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            } />
            <Route path="/juguete/categoria/nostalgia" element={
              <div className='page-container'>
                <div className='content-wrap'>
                  {
                    localStorage.getItem("isAdmin") === "true" ? // isAdmin ?
                      <></>
                      :
                      <div >
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                          <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                          />
                        </Drawer>
                        <StyledButton id="botonCarritoDesplegar" onClick={() => setCartOpen(true)}>
                          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon fontSize="large" htmlColor='#000000' />
                          </Badge>
                        </StyledButton>
                      </div>
                  }
                  <Grid container spacing={3}>
                    {data?.map(item => (
                      <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            } />
            <Route path="/edit/*" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <EditForm />
                :
                <h1>No tiene acceso a esa dirección</h1>
            } />
            <Route path="/contactanos" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <h1>No tiene acceso a esa dirección</h1>
                :
                <ContactUs />
            } />
            <Route path="confirmar-pedido" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <h1>No tiene acceso a esa dirección</h1>
                :
                <ProcesoPago
                  cartItems={cartItems.slice()}
                />
            }
            />
            <Route path="/perfilPod" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <h1>No tiene acceso a esa dirección</h1>
                :
                <></>
            }
            />
            <Route path="/loginPago" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <h1>No tiene acceso a esa dirección</h1>
                :
                <LoginForm />
            }
            />
            <Route path="/pedidos" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <h1>No tiene acceso a esa dirección</h1>
                :
                <HistorialPedidos />
            }
            />
            <Route path="/logoutPago" element={
              localStorage.getItem("isAdmin") === "true" ? // isAdmin?
                <h1>No tiene acceso a esa dirección</h1>
                :
                <LogoutForm />
            }
            />
            <Route path="/" element={
              <Home />
            }
            />
            <Route path="/*" element={
              <h1>No existe esa dirección</h1>
            } />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Wrapper>
    </>
  );

};

export default App;

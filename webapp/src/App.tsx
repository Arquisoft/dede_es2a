import {useState} from 'react';
import {useQuery} from 'react-query';

//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Navbar from './componentes/Navbar/Navbar';
import Drawer from '@material-ui/core/Drawer';
import LinearProgess from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//Styles
import {Wrapper, StyledButton} from './App.styles';
//Types
export type CartItemType = {
  id: number;
  category:string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async ():Promise<CartItemType[]> => 
  await(await fetch('https://fakestoreapi.com/products')).json();

const App = () => {

  //Esto nos va adecir si el carrito esta abierto, va a ser un booleano (cartOpen) que se inicia en false y que se puede modificar con la funcion  "setCartOpen"
  const [cartOpen, setCartOpen] = useState(false);

  //Inicialmente vamos a tener un array vacio de CartItemType que va a ser cartItems
  const[cartItems, setCartItems] = useState([] as CartItemType[]);


  const {data, isLoading, error} =useQuery<CartItemType[]>('products', getProducts);

  console.log(data);


  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item)=>ack+item.amount,0);


  const handleAddToCart = (clickedItem: CartItemType) => {
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
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev=>(
      prev.reduce((ack, item)=> {
        if(item.id===id){
          if(item.amount===1) return ack;
          return [...ack, {...item, amount:item.amount - 1}]
        } else {
          return [...ack, item];
        }
      },[] as CartItemType[]) 
    ))

  };


  //Coloca una barra de carga cuando la página está cargando
  if(isLoading) return <LinearProgess/>;
  if(error) return <div>Algo ha fallado</div>


return (

   

  <Wrapper>
     
    
     <Navbar state ={false} handleClick={handleClickk} />
    <Drawer anchor = 'right' open ={cartOpen} onClose={() => setCartOpen(false)}>
      
      <Cart 
        cartItems= {cartItems} 
        addToCart={handleAddToCart} 
        removeFromCart={handleRemoveFromCart}
      />
    </Drawer>
    <StyledButton onClick={()=> setCartOpen(true)}>
      <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon fontSize="large" htmlColor='#000000'/>
      </Badge>
    </StyledButton>
    <Grid container spacing = {3}>
      {data?.map(item => (
        <Grid item key = {item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart}/>
        </Grid>
      ))}
    </Grid>
  </Wrapper>
);
  
};

export default App;

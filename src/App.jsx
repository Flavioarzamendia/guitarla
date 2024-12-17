import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

import "./index.css";

function App() {
  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')

    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEM = 10;
  const MIN_ITEM = 1;

  useEffect(() => {
    
    localStorage.setItem('cart', JSON.stringify(cart))
  
  }, [cart])
  

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      if(cart[itemExist].quantity >= MAX_ITEM ) return
      const updareCart = [...cart];
      updareCart[itemExist].quantity++;
      setCart(updareCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
    saveLocalStorage()
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item
    });
    setCart(updateCart)
  }

  function decrementQuanity(id){
    const updateCart = cart.map((item) =>{
      if (item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item
    })
    setCart(updateCart)
  }

  function cartClear(){
      setCart([])
  }



  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuanity={decrementQuanity}
        cartClear = {cartClear}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

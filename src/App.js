import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data.js";
import Bookinfo from "./pages/Bookinfo.jsx";
import Cart from "./pages/Cart.jsx";
import React, { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }
  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }
  function removeItem(item){
    setCart(cart.filter(book => book.id !== item.id))
    console.log('removeItem', item)
  }
  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }
  useEffect(() => {
    
  }, [cart]);
  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <Bookinfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem}/>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
//teste
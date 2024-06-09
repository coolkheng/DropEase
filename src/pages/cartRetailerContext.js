import React, { createContext, useState } from 'react';

export const CartRetailerContext = createContext();

export const CartRetailerProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const decreaseQty = (product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      console.log("Updated cart items:", updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartRetailerContext.Provider value={{ cartItems, addToCart, decreaseQty, removeFromCart, clearCart }}>
      {children}
    </CartRetailerContext.Provider>
  );
};

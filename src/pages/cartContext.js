import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [authToken, setAuthToken] = useState(""); // Define authToken if it's managed here
  const [loading, setLoading] = useState(false); // Define loading state
  const [errorMessage, setErrorMessage] = useState(""); // Define error message state

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });
        const data = await response.json();
        console.log("Fetched data:", data);
        if (response.ok) {
          setCartItems(data); // Assuming data is an array of cart items
          setLoading(false);
        } else {
          setErrorMessage(data.errors || "Failed to fetch cart data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setErrorMessage("Failed to fetch cart data");
        setLoading(false);
      }
    };

    if (authToken) {
      fetchCart();
    }
  }, [authToken]);

  // Function to update cart items and calculate total price
  const updateCart = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      if (response.ok) {
        setCartItems(data); // Assuming data is an array of cart items
        setLoading(false);
      } else {
        setErrorMessage(data.errors || "Failed to fetch cart data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorMessage("Failed to fetch cart data");
      setLoading(false);
    }
  };

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

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

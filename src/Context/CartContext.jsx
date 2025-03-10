import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const getToken = () => localStorage.getItem("userToken");

const createHeaders = () => {
  const token = getToken();
  if (!token) {
    return {}; 
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

  
  async function addToCart(bikeId, setCart) {
    try {
      const headers = createHeaders();
      let payload = {
        bikes: [{ bikeId }],
      };
      let { data } = await axios.post(
        "https://alexa-back-production.up.railway.app/api/v1/cart/add",
        payload,
        createHeaders() 
      );
      
      setCart(data.cart.bikes);
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  }

  async function getLoggedUserCart() {
    try {
      const headers = createHeaders();
      if (Object.keys(headers).length === 0) {
        return; 
      }
  
      let { data } = await axios.get(
        `https://alexa-back-production.up.railway.app/api/v1/cart/all`,
        headers
      );
      setCart(data?.cart?.bikes || []);
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
      return {
        success: false,
        message: "Failed to fetch cart",
        error: error.response?.data || error.message,
      };
    }
  }
  

  async function removeFromCart (id) {
    try {
      let { data } = await axios.delete(
        `https://alexa-back-production.up.railway.app/api/v1/cart/remove/${id}`,
        createHeaders() 
      );
      setCart(data.cart.bikes);
      return data;
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
      return { success: false, message: "Failed to remove from cart", error: error.response?.data || error.message };
    }
  };

  async function updateQuantity(bikeId, quantity) {
    try {
      let { data } = await axios.patch(
        `https://alexa-back-production.up.railway.app/api/v1/cart/update/${bikeId}`,
        { quantity },
        createHeaders() 
      );
      setCart(data.cart.bikes);
      return data;
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
      return { success: false, message: "Failed to update quantity" };
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  },[]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, getLoggedUserCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

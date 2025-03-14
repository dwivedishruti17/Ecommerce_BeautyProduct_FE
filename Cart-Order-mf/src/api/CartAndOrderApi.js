import axios from 'axios';
const API_CART_URL  = "http://localhost:8082/cart";
const API_USER_URL = "http://localhost:8081/users";
const API_ORDER_URL = "http://localhost:8082/order";

const getToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    const config = {
      headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    
    };
    return config;
  };

 
  export const fetchCart = async () => {
    try {
      const token = getToken();
   
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const response = await axios.get(`${API_CART_URL}`, token
    );
      return response.data;
    } catch (error) {
      console.error("Error fetching cart details:", error);
      throw error;
    }
  };
   export const addAddress = async(addressdata) =>{
    try{
       const token = getToken();
       if(!token){
        throw new Error("Authentication token not found");
       }
       const response = await axios.post(`${API_USER_URL}/address`, addressdata,
       token);
       return response.data;
    }
    catch(error){
        console.error("Error adding new address: ", error);
        throw error;
    }
   }
   export const createOrder = async(orderdata) => {
    try{
      const token = getToken();
      if(!token){
        throw new Error("Authentication token not found");
      }
      const response = await axios.post(`${API_ORDER_URL}`, orderdata, token);
      return response.data;

    }
    catch(error){
      console.error("Error creating order", error);
      throw error;
    }
   }
   export const fetchOrder = async()=>{
    try{
      const token = getToken();
      if(!token){
        throw new Error("Authentication token not found");
      }
      const response = await axios.get(`${API_ORDER_URL}`, token);
      return response.data;
    }
    catch(error){
      console.error("Error in fetching orders:", error);
      throw error;
    }
   }
  export const fetchAddress = async()=>{
    try{
        const token = getToken();
        if(!token){
            throw new Error("Authentication token not found");
        }
        const response = await axios.get(`${API_USER_URL}/address`, token);
        return response.data;
    }
    catch(error){
        console.error("Error fetching address", error);
        throw error;
    }
  }

  export const updateCartQuantity = async (id, quantity) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }
      await axios.patch(API_CART_URL, {
        productId: id,
        quantity: quantity
      }, token);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  };

  export const deleteCartItem = async(productId) =>{
    try{
        const token = getToken();
        console.log("this is delete api");
        if(!token){
            throw new Error("Authentication token not found");
        }
        await axios.delete(`${API_CART_URL}/product/${productId}`, token);
    }
    catch(error){
        console.error("Error in deleting cart item", error);
        throw error;
    }
  }


import axios from "axios";
const API_BASE_URL = "http://localhost:8080/products";
const API_CATEGORY_URL = "http://localhost:8080/categories";
const API_SUBCATEGORY_URL = "http://localhost:8080/subcategories";
const API_CART_URL = "http://localhost:8082/cart";



const getToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    "Content-Type": "application/json"
  };
  return config;
};

export const fetchProducts = async (filters={}) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/filter`, filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchWishList = async()=>{

  try{
    const token = getToken();
    const response = await axios.get(`${API_CART_URL}/wishlist`, token);
    console.log("response.data", response.data);
    return response.data;
  }
  catch(error){
    console.error("Error fetching wishlist:", error);
    throw error;
  }
}

export const deleteWishList = async(productId) => {
  try{
    const token = getToken();
     await axios.delete(`${API_CART_URL}/wishlist/product/${productId}`, token);
    
  }
  catch(error){
    console.error("error in deleting the item : ", error);
    throw error;
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

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




export const deleteProduct = async(productId) =>{
  try{
    const token = getToken();
      await axios.delete(`${API_BASE_URL}/${productId}`, token);
      // return response.data;
  }
  catch(error){
    console.error("Error in deleting product :", error);
    throw error;

  }
};

export const addtocart = async(cartdata) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_CART_URL}`, cartdata, token);
        return response.data;
      } catch (error) {
        throw error.response?.data || "Cannot add item to cart";
      }
}

export const addToWishList = async(wishlistData) =>{
  try {
    const token = getToken();
    const response = await axios.post(`${API_CART_URL}/wishlist`, wishlistData, token);
        return response.data;
      } catch (error) {
        throw error.response?.data || "Cannot add item to cart";
      }
}

export const createProduct = async (productData) => {
  try {
    const token = getToken();
   
    const response = await axios.post(API_BASE_URL, productData,token);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async(productId, productData) =>{
  try {
    const token = getToken();
    const response = await axios.patch(`${API_BASE_URL}/${productId}`, productData,token);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axios.get(API_CATEGORY_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_CATEGORY_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const getSubCategoryById = async (subcategoryId) => {
  try {
    const response = await axios.get(`${API_SUBCATEGORY_URL}/${subcategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

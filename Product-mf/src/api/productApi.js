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

export const fetchProducts = async () => {
  try {

    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
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

// export const createProduct = async (productData) => {
//   try {
//     const response = await axios.post(API_BASE_URL, productData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating product:", error);
//     throw error;
//   }
// };

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

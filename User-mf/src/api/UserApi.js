import axios from 'axios';


const API_BASE_URL = "http://localhost:8081/users";
const API_PRODUCT_URL = "http://localhost:8080/products"

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  export const register = async(userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.data;
        } catch (error) {
          throw error.response?.data || "Registration failed";
        }
  }
  


const getToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
};

export const fetchData = async () => {
  try {
    const token = getToken();
 
    if (!token) {
      throw new Error("Authentication token not found");
    }
 
    const response = await axios.get(`${API_BASE_URL}/userdetails`, token
   
  );
 
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const fetchAllUser = async() =>{
  try{
    const token = getToken();
    if(!token){
      throw new Error("Authentication token not found");
    }
    const response = await axios.get(API_BASE_URL, token);
    return response.data;
  }
  catch(error){
    console.log("Error in fetching all user:", error);
    throw error;
  }
}

export const updateRole = async(userId, role) =>{
  try{
    const token = getToken();
    if(!token){
      throw new Error("Authentication token not found");
    }
    const response = await axios.put(`${API_BASE_URL}/${userId}/role`, {role}, token);
    return response.data;
  }
  catch(error){
    console.error("Error in updating role : ", role);
  }
}


export const addAddress = async(addressdata) =>{
  try{
     const token = getToken();
     if(!token){
      throw new Error("Authentication token not found");
     }
     const response = await axios.post(`${API_BASE_URL}/address`, addressdata,
     token);
     return response.data;
  }
  catch(error){
      console.error("Error adding new address: ", error);
      throw error;
  }
 }

 export const deleteaddress = async(addressId) =>{
  try{
    const token = getToken();
    if(!token){
      throw new Error("Authentication token not found");
    }
   await axios.delete(`${API_BASE_URL}/address/${addressId}`, token);
  }
  catch(error){
    console.error("Error in deleting the address: ", error);
    throw error;
  }
 }

 export const fetchTopProducts = async (filters={}) => {
  try {
    const response = await axios.post(`${API_PRODUCT_URL}/filter`,filters,  {limit: 5 });
    return response.data.slice(0,8);
  } catch (error) {
    console.error("Error fetching top products:", error);
    throw error;
  }

};
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import ProductDetailsCard from "../components/ProductDetailsCard";
import { ToastContainer, toast } from 'react-toastify';


const ProductDetails = () => {

    const {productId} = useParams();
    const[product, setProduct] = useState(null);
    const[loading, setLoading] = useState(null);
    const[error, setError] = useState(null);

    useEffect(()=>{
        const fetchProduct = async() =>{
            try{
                const data = await fetchProductById(productId);
                if(data){
                    setProduct(data);
                }
                else{
                    
                    setError("Product Not Found");
                    
                }

            }
            catch(err){  
                 setError("Error fetching Product");
                 toast.error("Products not found"); 

            }
            finally{
                setLoading(false);
                
            }
        };
        fetchProduct();
    }, [productId])
    return(
        <div>
             <ToastContainer style={{ color: "#FF407D" }} autoClose={2000} />
        {product && (
            <div>
                 
                <ProductDetailsCard product = {product}/>
            </div>
        )}
    </div>
    );
};

export default ProductDetails;
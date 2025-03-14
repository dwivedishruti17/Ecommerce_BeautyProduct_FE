import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import ProductDetailsCard from "../components/ProductDetailsCard";


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

            }
            finally{
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId])
    return(
        <div>
        {product && (
            <div>
                {/* <img src={product.imageUrl} alt={product.name} />
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p> */}
                <ProductDetailsCard product = {product}/>
            </div>
        )}
    </div>
    );
};

export default ProductDetails;
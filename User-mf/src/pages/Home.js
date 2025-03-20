import React from "react";
// import Navbar from "../components/Navbar";
import { Carousel } from  "react-bootstrap"
import { fetchTopProducts } from "../api/UserApi";
import {useEffect, useState} from "react";
import ProductCard from "Product_mf/ProductCard";

const Home = () =>{
  const[products, setProducts]=useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    name: "",
    order: "asc",
    sortBy: "price"
});
    useEffect(()=>{
      const fetchProduct = async()=>{
        try{
          const data = await fetchTopProducts(filters);
          setProducts(data);
          console.log("dataa", data);
          console.log("home page product data", products);
        }
        catch(error){
          console.log("cannot fetch error", error);
        }
      }
      fetchProduct();
    },[]);


    return(
      <div>
        {/* <Navbar/> */}
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://charactercosmetics.in/cdn/shop/files/HCF_Web.png?v=1739781506&width=2000"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://charactercosmetics.in/cdn/shop/files/Character_Pro_Palettes_Banner_WEB_749ef428-abb6-4b5c-a550-99a484c33265.png?v=1739959011&width=2000"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://charactercosmetics.in/cdn/shop/files/Cleopatra_Web.png?v=1739781571&width=2000"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="align-items-center" style={{marginLeft:"70px", marginTop:"10px"}}>
        <h2 style={{color:"#FF407D"}}><strong>What's new?</strong></h2>
      <ProductCard products={products} isWishlist={false}/>
      </div>
      
     
      </div>
    
    );
    
};
export default Home;
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { FaFilter } from "react-icons/fa6";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useLocation} from "react-router-dom";
import Filter from "../components/Filter";
 
const AllProduct = () => {
    const location = useLocation();
   

    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        name: "",
        order: "asc",
        sortBy: "price"
    });
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    // const fetchAllProducts = async () => {
    //     try {
    //         const data = await fetchProducts(filters);
    //         setProducts(data);
    //     } catch (error) {
    //         console.log("Cannot fetch products");
    //     }
    // };
 
    // useEffect(() => {
    //     fetchAllProducts();
    // }, []);


    const fetchFilteredProd = async() =>{
        const queryParam = new URLSearchParams(location.search);
        const name = queryParam.get("search");
        let requestBody = {};
        if (name) {
          requestBody.name = name;
          console.log("namee:", name);
        }
        if(name){
        let response = await fetchProducts(requestBody);
        setProducts(response);
        }
        else{
            const data = await fetchProducts(filters);
            setProducts(data);
        }
        console.log("response", response);  
    }

    useEffect(()=>{
        // const queryParam = new URLSearchParams(location.search);
        // const name = queryParam.get("search");
    //     async  function  fetchFilteredProd(){
    //     let requestBody = {};
    //     if (name) {
    //       requestBody.name = name;
    //       console.log("namee:", name);
    //     }
    //     if(name){
    //     let response = await fetchProducts(requestBody);
    //     setProducts(response);
    //     }
    //     else{
    //         const data = await fetchProducts(filters);
    //         setProducts(data);
    //     }
    //     console.log("response", response);  
    // }
    fetchFilteredProd()
    console.log("location.search", location.search);
    }, [location.search]);

 
    const handleFilterChange = (e) => {
setFilters({ ...filters, [e.target.name]: e.target.value });
    };
 
    const applyFilters = () => {
        fetchFilteredProd();
        handleClose();
    };
 
    return (
        <div className="container">
       <h6><strong><FaFilter onClick={handleShow} /> Filter & Sort</strong></h6>

     <Filter
  show={show}
  handleClose={handleClose}
  filters={filters}
  handleFilterChange={handleFilterChange}
  applyFilters={applyFilters}
    />
  
        {products.length > 0 ? (
          <ProductCard products={products} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
};
 
export default AllProduct;
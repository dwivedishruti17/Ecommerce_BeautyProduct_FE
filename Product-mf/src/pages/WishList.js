import React, { useEffect, useState } from "react";
import { fetchWishList } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { deleteWishList } from "../api/productApi";
import wishlistlogo from "./Assets/wishlistlogo.jpg"
// import { Button } from "react-bootstrap";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";



const WishList = () =>{

    const[wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchWishListItem = async()=>{
            try{
            const data = await fetchWishList();
            console.log("wishlist data", wishlist);
            setWishlist(data);
            }
            catch(e){
                console.log("cannot fetch wishlist", e);
            }
        }
        fetchWishListItem();
    },[]);



    return(
        <div className="container">
            {
                wishlist?.items?.length===0?(
                    <Container className="d-flex flex-column align-items-center justify-content-center text-center">
                    <Row>
                      <Col>
                        <Image src={wishlistlogo} style={{width:"250px"}} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h2 className="mt-3"><strong>No items in the wishlist</strong></h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Add now, Buy Later. Save your favourite beauty items here!</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className="btn-custom mb-3" onClick={()=>navigate("/")}><strong>Start Shopping</strong></Button>
                      </Col>
                    </Row>
                  </Container>):(
                    <ProductCard products={wishlist?.items ||[]} isWishList={true} />
                )
            }
           
        </div>
    )
}
export default WishList;
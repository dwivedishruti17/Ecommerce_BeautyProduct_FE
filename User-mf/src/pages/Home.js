import React from "react";
import Navbar from "../components/Navbar";
import { Carousel } from  "react-bootstrap"

const Home = () =>{
    return(
        
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
    
    );
    
};
export default Home;
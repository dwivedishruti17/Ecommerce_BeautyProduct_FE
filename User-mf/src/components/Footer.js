import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";


const Footer = () => {
  return (
    <div>
    <footer className="bg-dark text-light py-3 d-flex justify-content-between" style={{height:"120px"}}>
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Free-shipping.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>FREE SHIPPING</p>
          <hr />
          <p>On Orders above 599</p>
        </div>
      </div>
      <div className="d-flex">
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/return_accepted.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>EASY RETURNS</p>
          <hr />
          <p>15-day return policy</p>
        </div>
      </div>
      <div className="d-flex">
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Authenticity.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>100% AUTHENTIC</p>
          <hr />
          <p>Products Sourced directly</p>
        </div>
      </div>
      <div className="d-flex">
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Brands.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>100+ brands</p>
          <hr />
          <p>50k+ Products</p>
        </div>
      </div>
      
    </footer>
    <div style={{backgroundColor:"#E53888", height:"100px", color:"white"}} className="align-items-center justify-content-between text-center">
    <h6 className="fw-bold" style={{padding:"10px"}}>About Us</h6>
    <p className="mb-1">Premium beauty products for your daily glow.</p>
    <p className="mb-1">
          <FaEnvelope className="me-1" /> support@beautyshop.com
        </p>
      </div>
</div>
  );
};

export default Footer;

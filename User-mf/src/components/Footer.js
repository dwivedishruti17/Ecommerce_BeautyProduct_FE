import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <div>
    <footer className="bg-dark text-light py-3 d-flex justify-content-between" style={{height:"120px"}}>
      {/* <div className="text-center bg-secondary p-3 rounded shadow-sm" style={{ maxWidth: "320px", fontSize: "14px" }}>
        <h6 className="fw-bold">About Us</h6>
        <p className="mb-1">Premium beauty products for your daily glow.</p>

        <p className="mb-1">
          <FaEnvelope className="me-1" /> support@beautyshop.com
        </p>
        <p className="mb-1">
          <FaPhone className="me-1" /> +1 234 567 890
        </p>

        <div className="d-flex justify-content-center gap-3 my-2">
          <a href="#" className="text-light"><FaInstagram size={18} /></a>
          <a href="#" className="text-light"><FaFacebook size={18} /></a>
          <a href="#" className="text-light"><FaTwitter size={18} /></a>
        </div>

        <div className="small mt-2">
          <a href="#" className="text-light me-2">Privacy Policy</a> | 
          <a href="#" className="text-light mx-2">Terms</a> | 
          <a href="#" className="text-light ms-2">Returns</a>
        </div>

        <p className="small mt-2">© {new Date().getFullYear()} Beauty Shop</p>
      </div> */}
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Free-shipping.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>FREE SHIPPING</p>
          <hr />
          <p>On Orders above 599</p>
        </div>
      </div>
      <div style={{display:"flex"}}>
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/return_accepted.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>EASY RETURNS</p>
          <hr />
          <p>15-day return policy</p>
        </div>
      </div>
      <div style={{display:"flex"}}>
        <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Authenticity.svg" />
        <div style={{ marginLeft: "15px" }}>
          <p>100% AUTHENTIC</p>
          <hr />
          <p>Products Sourced directly</p>
        </div>
      </div>
      <div style={{display:"flex" }}>
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

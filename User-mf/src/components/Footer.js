import React from "react";
import { FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 d-flex justify-content-center">
      <div className="text-center bg-secondary p-3 rounded shadow-sm" style={{ maxWidth: "320px", fontSize: "14px" }}>
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
      </div>
    </footer>
  );
};

export default Footer;

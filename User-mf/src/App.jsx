import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "Product_mf/Product";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import Register from "./pages/Register";
import Cart from "Cart_Order_mf/Cart"

const App = () => (
  <div>
    <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
     <div className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product/*" element={<Product/>} />
        <Route path="/userdetail" element={<UserDetails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart/*" element={<Cart/>}/>
      </Routes>
      </div>
      <Footer/>
      </div>
    </BrowserRouter>
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

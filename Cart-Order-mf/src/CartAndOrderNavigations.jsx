import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import OrderConfirm from "./pages/OrderConfirm";
import Orders from "./pages/Orders";

const CartAndOrderNavigations = () =>{
  return (
    <Routes>
        <Route path="/mycart" element={<Cart/>}/>
        <Route path="/address" element={<Address/>}/>
        <Route path="/orderconfirm" element={<OrderConfirm/>}/>
        <Route path="/order" element={<Orders/>}/>
    </Routes>
  );
}

export default CartAndOrderNavigations;
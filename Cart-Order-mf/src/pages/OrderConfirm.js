import React from "react";
import logo from "./Assets/orderplaced.gif";
import {Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
const OrderConfirm = () =>{
  const navigate = useNavigate();
  // const { width, height } = useWindowSize()
    return(
      <div className="justify-content-center d-column">
      
      <div style={{ marginLeft: "400px" }}>
      <Confetti
      width={1200}
      height={1200}
    />  
        <img src={logo} style={{ width: "500px", height: "auto" }} />
        <div style={{ marginLeft: "65px", marginBottom: "30px" }}>
          <Button className="btn-custom w-50" onClick={() => navigate("/product/all")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
    )
}

export default OrderConfirm;
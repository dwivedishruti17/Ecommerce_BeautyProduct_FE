import React from "react";
import {Button, ProgressBar} from "react-bootstrap";
import { OrderStatus, statusMap } from "../pages/Orders";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

const Order = ({ order, handleStatusChange }) => {
  const [orderStatus, setOrderStatus] = useState(order.OrderStatus);
  const token = document.cookie .split("; ") .find((row) => row.startsWith("token=")) ?.split("=")[1];

  const [userRole, setUserRole] = useState('');

 useEffect(() => {
     const decodedToken = jwtDecode(token);
     setUserRole(decodedToken.role);
 }, [token]);


const getVariant = (status) => {
    switch (status) {
        case OrderStatus.PENDING:
            return 'warning';
        case OrderStatus.CANCELLED:
            return 'danger';
        case OrderStatus.COMPLETED:
            return 'success';
        default:
            return 'secondary';
    }
};

  return (
    <div class="justify-content-between">
    
      
      <section className="h-100" style={{ marginTop:"10px", width:"700px"}}>
        <div className=" h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div>
              <div className="card" style={{ borderRadius: "5px" }}>
                <div className="card-header px-4 py-3 d-flex justify-content-between">
                  <h5 class="text-muted mb-0"><p className="lead fw-normal mb-0" style={{ color: "#FF407D" }}><strong>Order Id:</strong></p> {order.id}</h5>
                  {userRole==="ROLE_ADMIN"?(<DropdownButton
            id="dropdown-basic-button"
            title={order.orderStatus}
            disabled={order.orderStatus===OrderStatus.CANCELLED}
            variant={getVariant(orderStatus)}
        >
            <Dropdown.Item onClick={() =>{ handleStatusChange(order.id, OrderStatus.PENDING); setOrderStatus(OrderStatus.PENDING) }} variant="warning">
                Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() =>{ handleStatusChange(order.id, OrderStatus.CANCELLED); setOrderStatus(OrderStatus.CANCELLED)}} variant="danger"
              >
                Cancelled
            </Dropdown.Item>
            <Dropdown.Item onClick={() =>{handleStatusChange(order.id, OrderStatus.COMPLETED); setOrderStatus(OrderStatus.COMPLETED)}} variant="success">
                Completed
            </Dropdown.Item>
        </DropdownButton>):(<Button variant="danger" 
                  onClick={()=>handleStatusChange(order.id, OrderStatus.CANCELLED)}
                  disabled={order.orderStatus===OrderStatus.CANCELLED}>Cancel Order</Button>)}
                </div>
                <div>
                  <p>Track order: <span> {order.orderStatus}</span>
                  </p>
                  <ProgressBar now={statusMap[order.orderStatus]} 
                  // style={order.status === OrderStatus.CANCELLED?{color:"danger"}:{color:"#FF407D"}}
                  variant={order.orderStatus===OrderStatus.CANCELLED?"danger":"success"}

                  />
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0" style={{ color: "#FF407D" }}><strong>Receipt</strong></p>
                    
                  </div>
                  {order.items.map((item, index) => (
                    <div className="card shadow-0 border mb-4" key={index}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <img src={item.image} className="img-fluid" alt={item.name} />
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">{item.name}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">₹{item.price}</p>
                          </div>
                          <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">Description: {item.description}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> ₹{order.totalAmount}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">Invoice Date: {order.orderDate}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">Delivery Address: 
                      
                  </p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges : </span> ₹0.00</p>
                  </div>
                </div>
                <div className="card-footer border-0 px-4 py-3" style={{ backgroundColor: "#FF407D", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                  <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total paid: <span className="h2 mb-0 ms-2">₹{order.totalAmount}</span></h5>
                </div>
                
              </div>
              {/* <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
import React from "react";
import { fetchOrder, getAllOrder, updateOrderStatus } from "../api/CartAndOrderApi";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, ProgressBar, Dropdown, DropdownButton } from "react-bootstrap";
import {useState, useEffect} from "react";
import { OrderStatus } from "./Orders";
import { jwtDecode } from "jwt-decode";
import { statusMap } from "./Orders";



const OrderDetails = () =>{
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus || OrderStatus.PENDING);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const [userRole, setUserRole] = useState("");

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
  
    useEffect(() => {
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      }
    }, [token]);
  
    useEffect(() => {
      async function fetchOrderDetails() {
        try {
          const data = await getAllOrder();
          const orderDetails = data.find(order => order.id === id);
          setOrder(orderDetails);
        } catch (error) {
          console.error("Cannot fetch order details:", error);
        }
      }
      fetchOrderDetails();
    }, [id]);
  
    // const handleStatusChange = async (newStatus) => {
    //   if (!order) return;
    //   const result = await updateOrderStatus(order.id, newStatus);
    //   if (result && result.orderStatus === newStatus) {
    //     setOrder({ ...order, orderStatus: newStatus });
    //   } else {
    //     alert("Failed to update the order status");
    //   }
    // };

    const handleStatusChange = async (newStatus) => {
        if (!order) return;
        const result = await updateOrderStatus(order.id, newStatus);
        if (result && result.orderStatus === newStatus) {
          setOrder({ ...order, orderStatus: newStatus });
          setOrderStatus(newStatus);
        } else {
          alert("Failed to update the order status");
        }
      };

    
  
    if (!order) return <p>Loading...</p>;
  
    return (
        <Container className="mt-4">
        <h2>Order Details</h2>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <div class="d-flex justify-content-between">
            <Card.Title>Order ID: {order.id}</Card.Title>
           <div>{userRole==="ROLE_ADMIN"?(<DropdownButton
            id="dropdown-basic-button"
            title={order?.orderStatus}
            disabled={order?.orderStatus===OrderStatus.CANCELLED}
            variant={getVariant(orderStatus)}
        >
            <Dropdown.Item onClick={() =>{ handleStatusChange(OrderStatus.PENDING); setOrderStatus(OrderStatus.PENDING) }} variant="warning">
                Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() =>{ handleStatusChange(OrderStatus.CANCELLED); setOrderStatus(OrderStatus.CANCELLED)}} variant="danger"
              >
                Cancelled
            </Dropdown.Item>
            <Dropdown.Item onClick={() =>{handleStatusChange(OrderStatus.COMPLETED); setOrderStatus(OrderStatus.COMPLETED)}} variant="success">
                Completed
            </Dropdown.Item>
        </DropdownButton>):(<Button variant="danger" 
                  onClick={()=>handleStatusChange(order.id, OrderStatus.CANCELLED)}
                  disabled={order?.orderStatus===OrderStatus.CANCELLED}>Cancel Order</Button>)}</div> </div>
            <Card.Text>Status: {order?.orderStatus}</Card.Text>
            {/* <ProgressBar now={order.orderStatus === OrderStatus.PENDING ? 50 : 100} variant={order.orderStatus === OrderStatus.CANCELLED ? "danger" : "success"} /> */}
            <ProgressBar now={statusMap[order?.orderStatus]} 
                //   style={order.status === OrderStatus.CANCELLED?{color:"danger"}:{color:"#FF407D"}}/>
                variant={order?.orderStatus===OrderStatus.CANCELLED?"danger":"success"}/>

            <Row>
              <Col>
              </Col>
              <Col className="text-end"></Col>
            </Row>
            
            <h5>Items:</h5>
            {order.items?.map((item, index) => (
              <Row key={index} className="mb-3">
                <Col md={2}><img src={item?.imageUrl} className="img-fluid" alt={item?.name} /></Col>
                <Col md={2}><p>{item?.name}</p></Col>
                <Col md={4}><p>{item?.description}</p></Col>
                <Col md={2}><p>₹{item?.price}</p></Col>
                <Col md={2}><p>Qty: {item?.quantity}</p></Col>
              </Row>
            ))}
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between">
           <div>
          <h5>Delivery Address:</h5>
                <p>{order.address.area}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
                <p>Phone: {order.address.phone}</p>
                </div>
                <div><h5>Total Price: ₹{order.totalAmount}</h5></div>
                </div>
            
          </Card.Footer>
        </Card>
      </Container>

  );
  
}

export default OrderDetails;
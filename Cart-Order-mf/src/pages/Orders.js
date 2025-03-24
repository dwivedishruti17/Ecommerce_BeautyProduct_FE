import React, { useEffect, useState } from "react";
import Order from "../components/Order";
import { fetchOrder, updateOrderStatus } from "../api/CartAndOrderApi";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import ErrorBoundary from "../components/ErrorBoundary";

export const OrderStatus = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
  }
 export const statusMap = {
    [OrderStatus.PENDING]:33,
    [OrderStatus.COMPLETED]:100,
    [OrderStatus.CANCELLED]:100
  }

const getVariant = (status) => {
    switch (status) {
        case 'Pending':
            return 'warning';
        case 'Cancelled':
            return 'danger';
        case 'Completed':
            return 'success';
        default:
            return 'secondary';
    }
};


const Orders = () => {

    const[orderData, setOrderData] = useState( [] );
    const[orders , setOrders]= useState(orderData);
    const navigate = useNavigate();
  
    const handleCardClick = (orderId) => {
        navigate(`/cart/order/${orderId}`);
      };
    useEffect(()=>{
        async function fetchUserOrder(){
            try{
              const data = await fetchOrder();
              setOrderData(data);
              setOrders(data);
              console.log(orderData);
            }
            catch(error){
                console.error("Cannot fetch orders:", error);
                throw error;
            }
        }
        fetchUserOrder();
    }, []);
  
    return(
        <div class="d-flex">  
           <ErrorBoundary>
           <Sidebar />
           </ErrorBoundary>
         
      <Container className="mt-4">
        <h2 className="mb-4">Your Orders</h2>
        <Row>
          {orders.map((order) => (
            <Col md={6} lg={4} key={order.id}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Order ID: {order.id}</Card.Title>
                  <Card.Text>Status: {order.orderStatus}</Card.Text>
                  <ProgressBar now={order.orderStatus === OrderStatus.PENDING ? 50 : 100} variant={order.orderStatus === OrderStatus.CANCELLED ? "danger" : "success"} />
                  <Card.Text><strong>Total Items:</strong> {order.items.length}</Card.Text>
                  <Card.Text>Total: ₹{order?.totalAmount>599?order?.totalAmount:order?.totalAmount+150}</Card.Text>
                  <Button
                    className="btn-custom"
                    onClick={() => handleCardClick(order.id)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
        </div>
       
    );
}

export default Orders;
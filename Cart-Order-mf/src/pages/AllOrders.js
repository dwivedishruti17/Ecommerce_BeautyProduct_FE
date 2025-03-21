import React from "react";
import { getAllOrder } from "../api/CartAndOrderApi";
import {useEffect , useState} from "react";
import { Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Button } from "react-bootstrap";
import { OrderStatus } from "./Orders";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {Row, Container, Col} from "react-bootstrap";

const getVariant = (status) => {
    switch (status) {
        case OrderStatus.PENDING:
            return 'warning';
        case OrderStatus.CANCELLED:
            return 'danger';
        case OrderStatus.COMPLETED:
            return 'success';
        default:
            return 'warning';
    }
};

const AllOrders = () =>{
    const[orders, setOrders] = useState([]);
    const[userRole, setUserRole] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchAllOrders = async() => {
            try{
               const data = await getAllOrder();
               setOrders(data);
               console.log("dataaa", data);
               console.log("orderrrrrsss", orders);
            }
            catch{
                console.log("cannot fetch orders")
            }
        }
        fetchAllOrders();
    }, []);

    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    if (typeof token === "string") {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, [token]);

    useEffect(() => {
        console.log("Updated Orders State:", orders); 
      }, [orders]);


    return(
        <div>
        {userRole === 'ROLE_ADMIN' ? (
          <div className="d-flex">
            <Sidebar />
            <div className="container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Total Amount</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id}>
                      <td onClick={() => navigate(`/cart/order/${order.id}`)}>{order.id}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.orderDate}</td>
                      <td>
                        <Button variant={getVariant(order.orderStatus)}>
                          {order.orderStatus ? order.orderStatus : OrderStatus.PENDING}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
              <Col className="text-center">
                 <h1><strong>You aren't allowed to access this Page!!</strong></h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONL8r02qaCFsLNDWI-bUdEo9wcBFZ25ybjw&s" alt="Unauthorized" />
              </Col>
            </Row>
          </Container>
        )}
      </div> 

    );
}

export default AllOrders;
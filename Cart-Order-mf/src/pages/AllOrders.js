import React from "react";
import { getAllOrder } from "../api/CartAndOrderApi";
import {useEffect , useState} from "react";
import { Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Button } from "react-bootstrap";
import { OrderStatus } from "./Orders";
import { useNavigate } from "react-router-dom";

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

    useEffect(() => {
        console.log("Updated Orders State:", orders); 
      }, [orders]);


    return(
        <div className="mt-4 d-flex">
             <Sidebar/>
        {/* <div className="d-flex justify-content-between mb-3"> */}
          {/* <h2>Order List</h2> */}
        {/* </div> */}
        <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>totalAmount</th>
              <th>Order Date</th>
              <th>Order Status</th>
              
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
          <tr key ={order.id}>
          <td onClick={()=>navigate(`/cart/order/${order.id}`)}>{order.id}</td>
            <td>{order.totalAmount}</td>
                <td>{order.orderDate}</td>
                <td><Button variant={getVariant(order.orderStatus)}>{order.orderStatus?order.orderStatus: OrderStatus.PENDING}</Button></td>
               
              </tr>
            ))}
          </tbody>
        </Table>
   
      </div>
      </div>
    );
}

export default AllOrders;
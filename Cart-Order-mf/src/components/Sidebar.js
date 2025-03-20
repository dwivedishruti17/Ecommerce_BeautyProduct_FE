import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { VscAccount } from "react-icons/vsc";
import { FaGift } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import { IoListCircleSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import {useState, useEffect} from "react";


const Sidebar = () =>{
    const navigate = useNavigate();
    const[userRole, setUserRole] = useState('');
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

    useEffect(() => {
      if (typeof token === 'string'){
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
      }
  }, [token]);
    return(
        <Col md={3} xl={2} className="border vh-100 vw-50 bg-light d-flex flex-column p-3">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/userdetail")} className="text-dark fw-bold d-flex align-items-center">
            <span style={{color:"#FF407D"}}><VscAccount size={28} className="m-2"/>My Profile</span>
          </Nav.Link>
        </Nav.Item>
        <hr/>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/cart/order")} className="text-dark fw-bold">
          <span style={{color:"#FF407D"}}><FaGift size={28} className="m-2"/>My Orders</span> 
          </Nav.Link>
        </Nav.Item>
        <hr/>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/userdetail")} className="text-dark fw-bold">
          <span style={{color:"#FF407D"}}><RiLogoutBoxLine size={28} className="m-2"/>Logout</span> 
          </Nav.Link>
        </Nav.Item>
        <hr/>

        {userRole==='ROLE_ADMIN'&& (
            <div>
            <Nav.Item onClick={()=>navigate("/product/table")} className="text-dark fw-bold">
            <Nav.Link>
                 <span style={{color:"#FF407D"}}><FaListUl size={20} className="m-2"/>All product</span> 
            </Nav.Link>
        </Nav.Item>
        <hr/>
        <Nav.Item onClick={()=>navigate("/cart/order/all")} className="text-dark fw-bold">
            <Nav.Link>
              <span style={{color:"#FF407D"}}><IoListCircleSharp size={28} className="m-2" />All Orders</span> 
            </Nav.Link>
        </Nav.Item>
        <hr/>
        
        <Nav.Item onClick={()=>navigate("/alluser")} className="text-dark fw-bold">
            <Nav.Link className="gap-2">
               <span style={{color:"#FF407D"}}><IoIosPeople size={28} className="m-2"/>All User</span> 
            </Nav.Link>
        </Nav.Item>
        </div>
        )}
        </Nav>
       
    </Col>
    )
}

export default Sidebar;
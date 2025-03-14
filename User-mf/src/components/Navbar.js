import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import logo from "./Assets/logobeauty.png";
import { VscAccount } from "react-icons/vsc";
import Dropdown from 'react-bootstrap/Dropdown';
import { RiAccountCircle2Line } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories"); 
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="top-bar d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image src={logo} className="logo" />  
         
          <h3 className="tagline">Where beauty meets bliss</h3>
        </div>

        <div className="d-flex align-items-center ">
          <Button className="btn-custom " onClick={()=>{
                  navigate("/login")}}>Login/Register</Button>
          <i className="bi bi-cart3 px-3 fs-3" onClick={()=>{navigate("/cart/mycart")}}></i>


          <Dropdown>
          <Dropdown.Toggle as="div" id="dropdown-custom-components">
          <VscAccount size={28}/>
      </Dropdown.Toggle>
          <Dropdown.Menu>
         <Dropdown.Item onClick={()=>handleNavigate("/userdetail")} className="d-flex align-items-center"> <RiAccountCircle2Line size={20} className="mr-3"/>
         My profile</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleNavigate("/cart/order")}><LuPackageCheck />Orders</Dropdown.Item>
        <Dropdown.Item href="#/action-3"><RiLogoutBoxLine />Logout</Dropdown.Item>
      </Dropdown.Menu>
          </Dropdown>
     


        </div>
      </div>

    
      <BootstrapNavbar expand="lg">
        <div className="d-flex justify-content-between align-items-center">
          <BootstrapNavbar.Brand href="#">
            <Image src={logo} className="small-logo" />
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
          <BootstrapNavbar.Collapse id="navbar-nav">
            <div className="d-flex align-items-center">
              <Nav className="me-auto">
                <Nav.Link className="nav-hover text-small" onClick={()=>{
                  navigate("/")
                }}> Home</Nav.Link>
              
                {categories.map((category) => (
                  <Nav.Link
                    key={category.id}
                    className="nav-hover text-small"
                    onClick={() => {
                      navigate(`product/subcategory/${category.id}`);
                      console.log("subactegory fetch karoo");
                    }}

                  >
                    {/* <NavLink to={`/subcategory/${category.id}`} className="nav-hover text-small"> */}
                    {category?.name}
                    {/* </NavLink> */}
                  </Nav.Link>
                ))}
              </Nav>
            </div>
           
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button className="btn-custom">Search</Button>
            </form>
          
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>

      {/* <div><img src="https://images-static.nykaa.com/uploads/7ddf70a6-fa52-496f-ab75-9a399ab17fd0.gif" class="w-100"/></div> */}
      
    </div>
  );
};

export default Navbar;

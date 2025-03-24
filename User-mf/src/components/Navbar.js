import React, { useEffect, useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import {useNavigate, useLocation } from "react-router-dom";
import logo from "./Assets/logobeauty.png";
import { VscAccount } from "react-icons/vsc";
import Dropdown from "react-bootstrap/Dropdown";
import { RiAccountCircle2Line } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { FaRegHeart } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoListCircleSharp } from "react-icons/io5";
import {ToastContainer, toast} from "react-toastify";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [pathname, setPathName] = useState(null);
  const location = useLocation();
  const [userRole, setUserRole] = useState("");

  const searchInRef = useRef(null);

  useEffect(() => {
    setPathName(location.pathname);
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("search");
    if (searchTerm) {
      searchInRef.current.value = searchTerm;
    }
  }, [location.search]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = searchInRef.current.value;
    navigate(`product/all?search=${searchQuery}`);
  };

  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };
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

  const handleLogout = () => {
    if (token) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUserRole(null);
      toast.success("Logged Out Successfully!")
      handleNavigate("/login");
    }
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
        <ToastContainer autoClose={1000}/>

          <Image src={logo} className="logo" />
          
         
          <BootstrapNavbar expand="lg">
        <div className="d-flex justify-content-between align-items-center">


          <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
          <BootstrapNavbar.Collapse id="navbar-nav">
            <div className="d-flex align-items-center">
              <Nav className="me-auto">
                <Nav.Link
                  className="nav-hover text-small"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {" "}
                  Home
                </Nav.Link>

                {categories.map((category) => (
                  <Nav.Link
                    key={category.id}
                    className="nav-hover text-small"
                    onClick={() => {
                      navigate(`product/subcategory/${category.id}`);
                      console.log("subactegory fetch karoo");
                    }}
                  >
                    {category?.name}
                  </Nav.Link>
                ))}
                <Nav.Link
                  className="nav-hover text-small"
                  onClick={() => {
                    navigate("/product/all");
                  }}
                >
                  All product
                </Nav.Link>
              </Nav>
            </div>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Products.."
                aria-label="Search"
                ref={searchInRef}
              />
              <button
                className="btn-custom rounded"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>
        </div>

        <div className="d-flex align-items-center">
          {token ? (
            <div className="d-flex align-items-center">
              <i
                className="bi bi-cart3 px-3 fs-3"
                onClick={() => {
                  navigate("/cart/mycart");
                }}
              ></i>
              <div
                class="mr-3"
                style={{ marginRight: "10px" }}
                onClick={() => navigate("/product/wishlist")}
              >
                <FaRegHeart size={28} />
              </div>
              <Dropdown>
                <Dropdown.Toggle as="div" id="dropdown-custom-components">
                  <VscAccount size={28} className="ml-3" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleNavigate("/userdetail")}
                    className="d-flex align-items-center"
                  >
                    <RiAccountCircle2Line size={20} className="mr-3" />
                    My profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNavigate("/cart/order")}>
                    <LuPackageCheck />
                    Orders
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <RiLogoutBoxLine />
                    Logout
                  </Dropdown.Item>

                  {userRole === "ROLE_ADMIN" && (
                    <>
                      <Dropdown.Item onClick={() => handleNavigate("/alluser")}>
                        <IoIosPeople /> All User
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleNavigate("/product/table")}
                      >
                        <FaListUl /> View All Product
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleNavigate("cart/order/all")}
                      >
                        <IoListCircleSharp /> All Orders
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Button
              className="btn-custom "
              onClick={() => {
                navigate("/login");
              }}
            >
              Login/Register
            </Button>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion, Form, ProgressBar } from "react-bootstrap";
import { FaHome, FaPlus } from "react-icons/fa";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { addAddress, fetchAddress } from "../api/CartAndOrderApi";
import { fetchCart } from "../api/CartAndOrderApi";
import { BiTrophy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/CartAndOrderApi";
// import logo from "./Assets/orderconfirm.png";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteaddress } from "../api/CartAndOrderApi";
import AddAddress from "../components/AddAddress";
import { ToastContainer, toast } from 'react-toastify';

const Address = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState({ items: [] });
    const [show, setShow] = useState(false);
    const [addresses, setAddresses] = useState([]);
    // const[loading, setLoading] = useState(false);
    const[orderdata, setOrderData]= useState({
      addressId:null
    })
    const [addressData, setAddressData] = useState({
         state:null,
         area:null,
         city:null,
         pincode:null,
         phone:null
      });


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();



  const fetchUserAddress = async()=>
    {
        try{
            const data = await fetchAddress();
            setAddresses(data);
        }
        catch(error){
            console.error("failed to load address: ",  error);
        }
    }
useEffect(()=>{
   
    fetchUserAddress();
}, []);


    useEffect(() => {
        fetchCart().then(data => {
            setCartItems(data);
        }).catch(error => {
            console.error('Error fetching cart data:', error);
        });
    }, []);

     const handleChange = (e) => {
        const { id, value } = e.target;
        setAddressData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

    const handleAddAddress = async(e)=>{
        e.preventDefault();
        try{
            await addAddress(addressData);
            console.log("add adresss krooooo");
            setShow(false);
            fetchUserAddress();
    
        }
        catch{
            console.log("error in adding address");
        }
    }
    
   const shippingCharge = 5;
   let subtotal = 0;

   if (cartItems && cartItems.items && Array.isArray(cartItems.items)) {
       cartItems.items.forEach(item => {
           if (item.price !== null) {
               subtotal += item.price * item.quantity;
           }
       });
   } else {
       console.error('Error in fetching cart', cartItems);
   }

   const handleDelete = async (addressId) => {
    try {
      await deleteaddress(addressId);
      setAddresses(addresses.filter(addr => addr.id !== addressId));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };


   const handlePlaceOrder = async(e) =>{
    e.preventDefault();
     try{
      //  setLoading(true);
      console.log("Current orderdata:", orderdata);
      if(orderdata.addressId==null){
        console.log("add address for placing an order");
      }
      await createOrder(orderdata);
        navigate("/cart/orderconfirm");
       
    
     }
     catch(error){
      toast("Please Select Address")
      console.error("error in placing order : ", error);
     }
   }

   const updateAddressId = (newAddressId) => {
    setOrderData((prevData) => ({
        ...prevData,
        addressId: newAddressId
    }));
};

const handleAddressSelection = (selectedAddressId) => {
  setSelectedAddress(selectedAddressId);
    updateAddressId(selectedAddressId);
};


    return (
      
     <div class="container" style={{marginBottom:"20px"}}>
        {/* <ProgressBar now={50} variant="danger" animated label="Checkout" className="mb-4" /> */}
        <h2><strong>Choose Address</strong></h2>
        <p class="text-muted">Detailed address will help our delivery partner reach your doorstep quickly</p>
        <Row>
          {/* Address Selection */}
          <Col md={6}>
            <Card className="mb-4 ">
              <Card.Header className="btn-select" style={{backgroundColor:"#FF406D", color:"white"}}>Select Address</Card.Header>
              <Card.Body>
                {addresses.map((addr) => (
                  <Card key={addr.id} class={`mb-2 ${selectedAddress === addr.id ? "border" : ""}`}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{addr.area}</strong>
                      <div className="d-flex"><p className="mb-1 text-muted">{addr.city}-{addr.pincode}</p></div>
                      <p>{addr.phone}</p>
                        </div>
                       
                       <div className=" g-2">
                        <Button 
                          style={selectedAddress === addr.id ? {backgroundColor:"#FF406D", borderColor:"#FF406D"} : {color:"#FF406D", borderColor:"#FF406D", backgroundColor:"white"}} 
                          onClick={() => handleAddressSelection(addr.id)}>
                          {selectedAddress === addr.id ? "Selected" : "Select"}
                        </Button>
                        <span onClick={() => handleDelete(addr.id)}> <FaRegTrashAlt style={{color:"#FF407D", cursor:"pointer"}}/></span>
                         </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                <Button style={{color:"#FF406D", backgroundColor:"white", borderColor:"#FF406D"}} className="mt-2 w-100" onClick={handleShow}>
                  <FaPlus  /> Add New Address
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add New Address</Offcanvas.Title>  
          
        </Offcanvas.Header>
        <Offcanvas.Body>
        
<AddAddress handleAddAddress={handleAddAddress} handleChange={handleChange}/>

        </Offcanvas.Body>
      </Offcanvas>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
          <img src="https://adn-static1.nykaa.com/media/wysiwyg/Payments/desktop-icons/header-address.svg"/>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{color:"#FF406D"}}>Cart Items ({cartItems.items.length})</Accordion.Header>
                <Accordion.Body>
                  {cartItems.items.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between">
                      <span>{item.name} x {item.quantity}</span>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              
              
              <Accordion.Item eventKey="1">
                <Accordion.Header>Price Details</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex justify-content-between">
                    <span>Total Price</span>
                    <strong>₹{subtotal}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Shipping Charge</span>
                    <strong>₹{shippingCharge}</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Final Total</span>
                    <strong className="text-danger">₹{subtotal + shippingCharge}</strong>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            
            <Button className="mt-4 w-100 btn-custom" onClick={handlePlaceOrder}>Proceed to Payment</Button>
            <ToastContainer style={{color:"#FF407D"}} 
                autoClose={2000}
                /> 
          </Col>
        </Row>
        </div>
    );
}

export default Address;
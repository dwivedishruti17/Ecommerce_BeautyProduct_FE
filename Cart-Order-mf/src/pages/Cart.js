import React, { useState , useEffect} from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { BiTrash, BiShieldCheck } from "react-icons/bi";
import { fetchCart } from "../api/CartAndOrderApi";
import axios from 'axios';
import { updateCartQuantity } from "../api/CartAndOrderApi";
import { deleteCartItem } from "../api/CartAndOrderApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
   const [cart, setCart] = useState({ items: [] });
   const navigate = useNavigate();

   const handleNavigate = (path) => {
     console.log(`Navigating to ${path}`);
     navigate(path);
   };


   useEffect(() => {
      fetchCart().then(data => {
          setCart(data);
      }).catch(error => {
          console.error('Error fetching cart data:', error);
      });
  }, []);

  
  const updateQuantity = async (id, change) => {
   try {
     const updatedItem = cart.items.find(item => item.productId === id);
     const newQuantity = Math.max(1, updatedItem.quantity + change);

     
     await updateCartQuantity(id, newQuantity);

     setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.productId === id ? { ...item, quantity: newQuantity } : item
      )
    }));
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
 };
  
 
      const removeItem = async (id) => {
         try {
           await deleteCartItem(id);
      setCart(prevCart => ({
             ...prevCart,
             items: prevCart.items.filter(item => item.productId !== id)
           }));
         } catch (error) {
           console.error('Error removing item:', error);
         }
       };
   
  
   let subtotal = 0;

   if (cart && cart.items && Array.isArray(cart.items)) {
       cart.items.forEach(item => {
           if (item.price !== null) {
               subtotal += item.price * item.quantity;
           }
       });
   } else {
       console.error('Error in fetching cart', cart);
   }

   // let discount=0;

   // const discount = cart.reduce((sum, item) => sum + (item.price * item.quantity * (item.discount / 100)), 0);


   // const shipping = cart.length > 0 ? 5.0 : 0;
   // const total = subtotal - discount + shipping;
  
   return (
     <div className="container bg-light py-4">
       {cart?.items?.length === 0 ? (
            <div className="text-center">
                <h4>Your cart is empty</h4>
                <p>Add items to your cart to see them here.</p>
            </div>
        ) :(
         <Row className="g-4">
         
            <Col lg={8}>
             <div className="d-flex justify-content-between align-items-center mb-4">
               <h4>Shopping Cart</h4>
               {/* <span className="text-muted">{cart.length} items</span> */}
             </div>
             {cart?.items?.map(item => (
       <Card key = {item.productId} className="p-3 shadow-sm mb-3">
                 <Row className="align-items-center">
                   <Col md={2}>
   <img src={item?.imageUrl} alt={item?.name} className="product-image" style={{ width: '100px', height: '100px' }} />
                   </Col>
                   <Col md={4}>
       {/* <h6> {item?.productId}</h6> */}
                      <p className="text-muted mb-1">{item?.description}</p>
 {/* {item.discount > 0 && <span className="badge bg-success"> {item.discount}% OFF</span>}  */}
                    </Col>
                   <Col md={3} className="d-flex align-items-center gap-2">
 <Button variant="light " size="sm" onClick={()=>updateQuantity(item.productId, -1)}>-</Button>
                     <Form.Control type="number" value={item.quantity} className="quantity-input text-center" readOnly />
 <Button variant="light" size="sm" onClick={()=>updateQuantity(item.productId, 1)}>+</Button>
                   </Col>
                   <Col md={2}> 
                     <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                    </Col>
                   <Col md={1}>
 <BiTrash onClick={()=>removeItem(item.productId)} />
                   </Col>
                 </Row>
               </Card>
             ))}
           </Col> 
  
           {/* Order Summary */}
            <Col lg={4}>
             <Card className="p-4 shadow-sm">
               <h5>Order Summary</h5>
               <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted">Subtotal</span>
                 <span>₹{subtotal.toFixed(2)}</span>
               </div>
               {/* <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted">Discount</span>
                 <span className="text-success">-${discount.toFixed(2)}</span>
               </div>  */}
                <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted">Shipping</span>
                 <span>₹0.00</span>
               </div>
               <hr />
               <div className="d-flex justify-content-between mb-3">
                 <strong>Total</strong>
                 <strong>₹{subtotal.toFixed(2)}</strong>
               </div>
               {/* <InputGroup className="mb-3">
                 <Form.Control type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                 <Button variant="outline-secondary">Apply</Button>
               </InputGroup> */}
               <Button className="w-100 btn-custom" onClick={()=>{handleNavigate("/cart/address")}} >Proceed to Checkout</Button>
               <div className="text-center mt-2 d-flex justify-content-center gap-2"> 
                 {/* <BiShieldCheck className="text-success" /> <small className="text-muted">Secure checkout</small> */}
                </div>
           </Card>
            </Col>
         </Row> 
        )}
     </div>
   );
}

export default Cart;
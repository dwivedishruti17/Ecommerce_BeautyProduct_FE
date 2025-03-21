import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { deleteWishList } from "../api/productApi";
import { useState } from "react";
import { addtocart } from "../api/productApi";
import { ToastContainer, toast } from 'react-toastify';

const ProductCard = ({ products, isWishList , onDelete }) => {
  const [productList, setProductList] = useState([products]);
  const navigate = useNavigate();
  const [cart, setCart] = useState({
    id:"",
    quantity:1
  });
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleDeleteWishlistItem = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteWishList(productId);
      setProductList((prevProductList) => prevProductList.filter((prod) => prod.productId !== productId));
      if (onDelete) {
        onDelete(productId);
      }
    } catch (e) {
      console.log("Cannot delete product: ", e);
    }
  };

  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];

  const handleAddToCart = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      {token?toast("Item added to Cart!"):toast("Please Sign in to add Items to your Cart")}
      const product = productList.find((prod) => prod.productId === productId);
      const cartData = { productId, quantity: 1 }; 
      await addtocart(cartData);
      setCart([...cart, { ...product, quantity: 1 }]);
      console.log("Product added to cart");
    } catch (e) {
      console.log("Cannot add product to cart: ", e);
    }
  };


  return (
    <Row xs={1} md={2} className="g-3">
      {products?.map((prod) => (
        <Col
          key={!isWishList ? prod.id : prod.productId}
          style={{ width: "280px" }}
        >
          <Card
            onClick={() =>
              handleCardClick(isWishList ? prod.productId : prod.id)
            }
            style={{ height: "320px", margin: "15px" , borderRadius:"0px"}}
            className="border radius-0 shadow-lg"
          >
            <div
              style={{
                width: "232px",
                height: "250px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {prod.quantity === null && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "red",
                    
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    zIndex: 1,
                    borderColor:"red",
                    borderWidth:"3px"
                  }}
                >
                  Out of Stock
                </div>
              )}

              {isWishList && (
                <div
                  onClick={(e) => handleDeleteWishlistItem(prod.productId, e)}
                >
                  <IoIosCloseCircleOutline />
                </div>
              )}
              <Card.Img
                variant="top"
                src={prod.imageUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Card.Body>
              <Card.Title>{prod?.name}</Card.Title>
              <p style={{color:"red"}}>MRP: ₹{prod?.price}</p>
              <span style={{fontSize:"15px"}}>{prod?.description.slice(0, 50)}...</span>
            </Card.Body>
              <button
                className="custom-button p-2 rounded-bottom"
                disabled={prod.quantity === null}
                style={{
                  backgroundColor:
                    prod.quantity === null || prod.quantity === 0
                      ? "#FF407D"
                      : ""
                }}
                onClick={(e) => handleAddToCart(isWishList?prod.productId: prod.id, e)}
              >
                {isWishList ? "Move to Bag" : "Add to cart"}
              </button>
              <ToastContainer
                autoClose={2000}
                /> 
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCard;

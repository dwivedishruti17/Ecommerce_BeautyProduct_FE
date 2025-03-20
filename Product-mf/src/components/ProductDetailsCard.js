import React, { useState } from "react";
import { PiKeyReturnFill } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import "./components.css";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { addtocart } from "../api/productApi";
import { ToastContainer, toast } from "react-toastify";
import { addToWishList } from "../api/productApi";

const ProductDetailsCard = ({ product }) => {
  const [toggle, setToggle] = useState(false);
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const [cartData, setCartData] = useState({
    productId: product.id,
    quantity: 1,
  });

  const [wishlistData, setWishlistData] = useState({
    productId: product.id,
    quantity: 1,
  });
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleAddToCart = async () => {
    try {
      {
        token
          ? toast("Item added to cart!")
          : toast("Please Sign in to add Items to your cart");
      }
      // toast("Item added to cart!")
      await addtocart(cartData);

      cartData();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleAddtoWishList = async () => {
    try {
      {
        token
          ? toast("Item added to WishList!")
          : toast("Please Sign in to add Items to your WishList");
      }
      await addToWishList(wishlistData);
    } catch (error) {
      console.error("Error adding item to wishlist", error);
    }
  };

  const handleQuantityChange = (e) => {
    setCartData({
      ...cartData,
      quantity: parseInt(e.target.value),
    });
  };
  console.log("Product quantity:", product.quantity);

  return (
    <div class="py-5 mx-4">
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            {product.quantity === null && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                  zIndex: 1,
                }}
              >
                <h2>
                  <strong>Out of Stock</strong>
                </h2>
              </div>
            )}

            <img src={product.imageUrl} class="card-img-top" />
          </div>
        </div>

        <div class="col-md-6">
          <h1 class="h2 mb-3">{product.name}</h1>
          <div class="mb-3">
            <span class="h4 me-2">
              MRP: ₹<span className="font-weight-bold">{product.price}</span>
            </span>
            <p>inclusive of all taxes</p>
            {/* <span class="text-muted text-decoration-line-through">₹1999.99</span>  */}
            {/* <span class="badge bg-danger ms-2">25% OFF</span> */}
          </div>

          <h3 class="mb-4">{product.description}</h3>

          <div className="mb-4">
            <div className="d-flex align-items-center">
              <label className="me-2">Quantity:</label>
              <select
                name="quantity"
                className="form-select w-auto"
                value={cartData.quantity}
                onChange={handleQuantityChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div class="d-grid gap-2">
            <button
              className="custom-button"
              disabled={product.quantity === null}
              onClick={handleAddToCart}
              // style={{
              //   backgroundColor: product.quantity === null ? "#FF407D" : "",
              //   borderColor: product.quantity === null ? "#FF407D" : "",
              // }}
            >
              Add to Cart
            </button>

            <ToastContainer style={{ color: "#FF407D" }} autoClose={2000} />
          </div>
          <div class="d-grid gap-2">
            <button
              style={{
                backgroundColor: "white",
                borderColor: "#FF407D",
                textDecoration: "#FF407D",
              }}
              onClick={handleAddtoWishList}
            >
              Add to WishList
            </button>
            <ToastContainer style={{ color: "#FF407D" }} autoClose={2000} />
          </div>

          <div class="mt-4">
            <div class="d-flex align-items-center mb-2">
              <LiaShippingFastSolid />
              <span>Free shipping on orders over ₹599</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              {/* <i class="fas fa-undo text-primary me-2"></i> */}
              <PiKeyReturnFill /> <span>14-day return policy</span>
            </div>

            <div className="border border-light" onClick={handleToggle}>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <h4 className="d-inline ml-3">Description</h4>
                {toggle ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {toggle && (
                <div className="mt-3">
                  Explore the entire range of Concealer available on Nykaa. Shop
                  more Maybelline New York products here.You can browse through
                  the complete world of Maybelline New York Concealer . Expiry
                  Date: 15 April 2027 Country of Origin: China Address: Yichang
                  Tianmi International Cosmetics Co.,44300, No.18 Xihu Road,
                  Xiling Economic Developing Zone, China
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;

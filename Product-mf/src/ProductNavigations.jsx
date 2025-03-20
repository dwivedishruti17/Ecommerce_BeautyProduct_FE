import React from "react";
import SubCategory from "./pages/SubCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Test from "./pages/Test"
import ProductDetails from "./pages/ProductDetails";
import AllProduct from "./pages/AllProduct";
import AllProductTable from "./pages/AllProductTable";
import WishList from "./pages/WishList";
const ProductNavigations = () => {
  console.log("product");
  return (
    <Routes>
      <Route path="/subcategory/:categoryId" element={<SubCategory />} />
      <Route
        path="/products/:subcategoryId"
        element={<Product />}
      />
      <Route path="/productDetail/:productId" element={<ProductDetails/>}/>
      <Route path="/allproduct" element={<AllProduct/>}/>
      <Route path="/table" element={<AllProductTable/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
    </Routes>
  );
};

export default ProductNavigations;

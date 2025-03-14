// import { useEffect, useState } from "react";
// import { fetchProducts } from "../api/productApi";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const data = await fetchProducts();
//         // console.log("producttt data", data);
//         setProducts(data);
//       } catch (error) {
//         console.error("Failed to load products", error);
//       }
//     }
//     loadProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       <ul>
//         {products.map((product) => (
//           <li>
//             key={product.id} {product?.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

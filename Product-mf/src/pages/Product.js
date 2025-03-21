import { getSubCategoryById } from "../api/productApi";
import { useParams } from "react-router-dom";
import React, { useState, useEffect , Suspense} from "react";
import ProductCard from "../components/ProductCard";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const { subcategoryId } = useParams();
  const [subcategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getSubCategoryById(subcategoryId);
        console.log("productt dataa ", data);
        if (data) {
          setSubCategory(data);
        } else {
          setError("Products not found");
        }
      } catch (err) {
        toast.error("Subcategory Not found");
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [subcategoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div>
      <h2>{subcategory?.name}</h2>
      <ul>
       <ToastContainer style={{ color: "#FF407D" }} autoClose={2000} />
        <ProductCard products={subcategory?.products || []} isWishList={false} />
      </ul>
    </div>
  );
};
export default Product;

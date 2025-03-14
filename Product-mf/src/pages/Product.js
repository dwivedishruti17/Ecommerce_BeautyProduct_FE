import { getSubCategoryById } from "../api/productApi";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

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
        {/* {subcategory?.products?.map((prod) => (
          <li key={prod.id}>{prod?.name}</li>
        ))} */}
        <ProductCard products={subcategory?.products || []} />
      </ul>
    </div>
  );
};
export default Product;

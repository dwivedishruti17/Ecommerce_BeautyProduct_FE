import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../api/productApi";
import SubCategoryList from "../components/SubCategoryList"; 

const SubCategory = () => {
  const { categoryId } = useParams(); 
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(categoryId);
        if (data) {
          setCategory(data);
        } else {
          setError("Category not found");
        }
      } catch (err) {
        setError("Error fetching category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{category?.name}</h2>
      <ul>   
        <SubCategoryList subcategories={category?.subcategories || []} />
      </ul>
    </div>
  );
};

export default SubCategory;

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams(); 
  const [selectedCategory, setSelectedCategory] = useState(categoryId || "67ce17d844d44c5d5530417e");

  async function getCategories() {
    try {
      let { data } = await axios.get("https://alexa-back-production.up.railway.app/api/v1/category/all");
      setCategories(data.allCategories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }

  async function getProductsByCategory(categoryId) {
    try {
      const { data } = await axios.get(`https://alexa-back-production.up.railway.app/api/v1/bike/category/${categoryId}`);
      return data.bikes; 
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  const { data: bikes, isLoading, isError } = useQuery({
    queryKey: ["Bikes", selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
    enabled: Boolean(selectedCategory), 
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Alexa Categories</title>
      </Helmet>

      <CategorySlider onCategorySelect={setSelectedCategory} />

      {selectedCategory && (
        <div className="row my-3 gy-3">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="text-center">Error fetching products. Please try again later.</p>
          ) : bikes?.length === 0 ? (
            <p className="text-center">No products found in this category.</p>
          ) : (
            bikes.map((product) => <ProductItem key={product._id} product={product} />)
          )}
        </div>
      )}
    </>
  );
}

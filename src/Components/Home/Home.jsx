import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import useNetwork from "../../Hooks/useNetwork";
import { Link } from "react-router-dom";

export default function Home() {
  let x = useNetwork();

  async function getFeaturedProducts() {
    const res = await axios.get(`https://alexa-back-production.up.railway.app/api/v1/bike/all`);
    return res.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getFeaturedProducts,
    // cacheTime:3000,
    // refetchOnMount: true, // Refetch when component mounts
    // refetchInterval: 3000,
    // staleTime: 0, // Fetch new data on every request
    // enabled:false
  });

  useEffect(() => {
    console.log("API Response Data:", data);
  }, [data]);

  const groupedProducts = data?.bikes?.reduce((acc, product) => {
    const categoryName = product.categoryId?.name || "Other";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Alexa Home</title>
      </Helmet>
      {/* {x} */}
      <MainSlider />
      {isLoading ? (
        <Loader />
      ) : (
        Object.keys(groupedProducts || {}).map((category) => (
          <div key={category} className="mb-5">
            <h3 className="text-primary fw-bold text-center mt-4 border-bottom pb-4">
              {category}
            </h3>

            <div className="row gy-4">
              {groupedProducts[category].slice(0, 4).map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>

            <div className="text-center mt-4">
              <Link
                to={"/categories"}
                className="btn btn-outline-primary btn-lg px-5 py-2 rounded-pill shadow-sm"
              >
                Explore More <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}

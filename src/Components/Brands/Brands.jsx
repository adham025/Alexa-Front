import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import BrandSlider from "../BrandSlider/BrandSlider";
import { useQuery } from "@tanstack/react-query";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const { brandId } = useParams(); 
  const [selectedBrand, setSelectedBrand] = useState(brandId || "67ce1a5b44d44c5d553041c0");

  async function getBrands() {
    try {
      let { data } = await axios.get("https://alexa-back-production.up.railway.app/api/v1/brand/all");
      setBrands(data.allBrands);
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  }

  async function getProductsByBrand(brandId) {
    try {
      const { data } = await axios.get(`https://alexa-back-production.up.railway.app/api/v1/bike/brand/${brandId}`);
      return data.bikes; 
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  const { data: bikes, isLoading, isError } = useQuery({
    queryKey: ["Bikes", selectedBrand],
    queryFn: () => getProductsByBrand(selectedBrand),
    enabled: Boolean(selectedBrand), 
  });

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Alexa Brands</title>
      </Helmet>

      <BrandSlider onBrandSelect={setSelectedBrand} />

      {selectedBrand && (
        <div className="row my-3 gy-3">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="text-center">Error fetching products. Please try again later.</p>
          ) : bikes?.length === 0 ? (
            <p className="text-center">No products found in this brand.</p>
          ) : (
            bikes.map((product) => <ProductItem key={product._id} product={product} />)
          )}
        </div>
      )}
    </>
  );
}

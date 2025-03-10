import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import axios from "axios";

export default function BrandSlider({ onBrandSelect }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4, dots: true },
      },
      {
        breakpoint: 992, // Medium screens (Tablets)
        settings: { slidesToShow: 3, dots: true },
      },
      {
        breakpoint: 768, // Small screens (Mobile Landscape)
        settings: { slidesToShow: 2, dots: true },
      },
      {
        breakpoint: 480, // Extra small screens (Mobile Portrait)
        settings: { slidesToShow: 1, dots: true },
      },
    ],
  };

  async function getBrands() {
    const res = await axios.get(`https://alexa-back-production.up.railway.app/api/v1/brand/all`);
    return res.data.allBrands;
  }

  const { data: brands = [], isError } = useQuery({
    queryKey: ["brandSlider"],
    queryFn: getBrands,
  });

  const handleBrandSelect = (brand) => {
    onBrandSelect(brand); 
  };
  

  return (
    <>
      {isError && <p>Error fetching brands</p>}
      <div className="p-4 mt-4">
        {brands.length > 0 ? (
          <Slider {...settings}>
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="text-center d-flex flex-column align-items-center"
                onClick={() => handleBrandSelect(brand._id)} 
                style={{ cursor: "pointer" }}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="brand-image shadow-sm"
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <div className="fw-bold mt-3">{brand.name}</div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No brands found</p>
        )}
      </div>
    </>
  );
}


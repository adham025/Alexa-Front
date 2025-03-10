import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider({ onCategorySelect }) {
  var settings = {
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

  async function getCategories() {
    const res = await axios.get(`https://alexa-back-production.up.railway.app/api/v1/category/all`);
    return res.data.allCategories;
  }

  const { data: categories = [], isError } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCategories,
  });

  const handleCategorySelect = (category) => {
    onCategorySelect(category); 
  };
  

  return (
    <>
      {isError && <p>Error fetching categories</p>}
      <div className="p-4 mt-4">
        {categories.length > 0 ? (
          <Slider {...settings}>
            {categories.map((category) => (
              <div
                key={category._id}
                className="text-center d-flex flex-column align-items-center"
                onClick={() => handleCategorySelect(category._id)} 
                style={{ cursor: "pointer" }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image shadow-sm"
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <div className="fw-bold mt-3">{category.name}</div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </>
  );
}


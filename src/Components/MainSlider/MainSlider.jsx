import React from "react";
import Slider from "react-slick";
import slide11 from "../../assets/images/a1.webp";
import slide12 from "../../assets/images/a11.jpg";
import slide13 from "../../assets/images/a22.jpg";
import slide2 from "../../assets/images/a2.jpeg";
import slide3 from "../../assets/images/a3.webp";

export default function MainSlider() {

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2500, 
    pauseOnHover: true, 
  };
  
    return (
      <div className="container mt-3">
        <div className="row g-3">
          <div className="col-md-9">
            <Slider {...settings}>
              <div>
                <img
                  height={400}
                  className="w-100 rounded shadow-sm"
                  src={slide11}
                  alt="Slide 11"
                />
              </div>
              <div>
                <img
                  height={400}
                  className="w-100 rounded shadow-sm"
                  src={slide12}
                  alt="Slide 12"
                />
              </div>
              <div>
                <img
                  height={400}
                  className="w-100 rounded shadow-sm"
                  src={slide13}
                  alt="Slide 13"
                />
              </div>
            </Slider>
          </div>
  
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              height={190}
              className="w-100 rounded shadow-sm"
              src={slide2}
              alt="Slide 2"
            />
            <img
              height={190}
              className="w-100 rounded shadow-sm"
              src={slide3}
              alt="Slide 3"
            />
          </div>
        </div>
      </div>
    );
  };
  

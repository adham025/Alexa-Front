import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { ToastContainer, toast, Slide } from "react-toastify";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [loadingCart, setLoadingCart] = useState(false);
  const navigate = useNavigate();

  const getProductDetails = async (id) => {
    try {
      const res = await axios.get(`https://alexa-back-production.up.railway.app/api/v1/bike/${id}`);
      return res.data.bike;
    } catch (error) {
      console.error("Error fetching bike details:", error);
      throw new Error("Failed to fetch product details.");
    }
  };

  const {
    data: bike,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
  });

  const handleAddToCart = async () => {
    if (!bike?._id) {
      console.error("Error: Bike ID is missing");
      return;
    }
    const token = localStorage.getItem("userToken"); 
    if (!token) {
      credentials();
      setTimeout(() => {
      navigate("/login");
      }, 3000);
      return;
    }

    try {
      const response = await addToCart(bike._id);
      console.log("Cart Response:", response);
      notify();
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  };

  const notify = () =>
    toast.success("Added Successfully", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

    const credentials = () => toast.success('You have to login first', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-danger">Error fetching product details.</p>;

  return (
    <>
<div className="container my-5">
  <div className="card shadow-lg border-0 p-4 rounded-4">
    <div className="row align-items-center">
      {/* ✅ Image Section */}
      <div className="col-md-5 text-center mb-4">
        <div className="position-relative">
          <img
            src={bike?.images?.[0] || '/images/placeholder-bike.jpg'}
            className="img-fluid rounded bike-image shadow-sm"
            style={{
              maxHeight: '400px',
              maxWidth: '100%',
              objectFit: 'contain',
              padding: bike?.images?.[0] ? '0' : '10px',
              transition: 'transform 0.3s',
              cursor: 'pointer',
            }}
            alt={bike?.name || 'Bike'}
            loading="lazy"
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </div>
      </div>

      <Helmet>
        <title>{bike?.name || 'Bike Details'}</title>
      </Helmet>

      {/* ✅ Bike Details Section */}
      <div className="col-md-7">
        <h2 className="fw-bold mb-3 text-primary">{bike?.name || 'Unknown Bike'}</h2>
        <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
          {bike?.description || 'No description available.'}
        </p>

        {/* ✅ Color Badge */}
        <div className="mb-4">
          <span
            className="badge px-3 py-2 fw-bold shadow-sm"
            style={{
              backgroundColor: bike?.color?.toLowerCase(),
              color: bike?.color?.toLowerCase() === 'white' ? '#bfbfbf' : '#fff',
            }}
          >
            Color: {bike?.color ?? 'N/A'}
          </span>
        </div>

        {/* ✅ Price Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-success fw-bold">${bike?.finalPrice ?? '0.00'}</h4>
          {bike?.discount > 0 && (
            <p className="text-danger mb-0">
              <del>${bike?.price}</del> (-{bike?.discount}% Off)
            </p>
          )}
        </div>

        {/* ✅ Add to Cart Button */}
        <button
          className="btn btn-warning w-100 mt-3 shadow-sm fw-bold py-2 rounded-pill"
          style={{ transition: '0.3s', opacity: loadingCart ? 0.7 : 1 }}
          onClick={handleAddToCart}
          disabled={loadingCart}
        >
          {loadingCart ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </button>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  </div>

  {/* ✅ Thumbnails Section */}
  {bike?.images?.length > 1 && (
    <div className="thumbnail-gallery mt-5 d-flex justify-content-center gap-4">
      {bike?.images?.slice(1, 4).map((image, index) => (
        <div
          key={index}
          className="thumbnail-wrapper"
          style={{
            transition: 'all 0.3s',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => {
            document.querySelector('.bike-image').src = image;
          }}
        >
          <img
            src={image || '/images/placeholder-bike.jpg'}
            className="img-fluid rounded shadow-sm"
            style={{
              width: '300px',
              height: '330px',
              objectFit: 'cover',
              border: '2px solid #fff',
              borderRadius: '10px',
            }}
            alt={`${bike?.name || 'Bike'} - Thumbnail ${index + 2}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
};


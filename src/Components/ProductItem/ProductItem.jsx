import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ToastContainer, toast, Slide } from 'react-toastify';

export default function ProductItem({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!product?._id) {
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

    console.log("Sending Cart Data:", { bikes: [{ bikeId: product._id }] });
  
    try {
      const response = await addToCart(product._id); 
      console.log("Cart Response:", response);
      notify(); 
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };

  const notify = () => toast.success('Added Successfully', {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    });;

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
    });;
  
    return (
      <div className="col-md-4 col-lg-3 col-sm-6 gy-4">
        <div className="card h-100 border-0 shadow-lg p-3 d-flex flex-column rounded-4 product-card">
          {/* Image Container */}
          <div className="position-relative overflow-hidden rounded-3">
            <Link to={`/product-details/${product._id}`}>
              <img
                src={product.images?.[0] || 'fallback-image.jpg'}
                alt={product.name}
                className="card-img-top rounded-3 product-image"
                loading="lazy"
              />
            </Link>
            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="badge bg-danger position-absolute top-0 start-0 m-2 shadow-sm">
                {product.discount}% OFF
              </div>
            )}
          </div>
  
          {/* Card Body */}
          <div className="card-body d-flex flex-column flex-grow-1 text-center">
            <h5 className="card-title text-dark fw-bold mb-3">{product.name}</h5>
  
            {/* Category & Color Badges */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
              <span className="badge bg-primary px-3 py-2 fw-bold text-uppercase shadow-sm">
                {product.categoryId?.name || 'Unknown'}
              </span>
              <span
                className="badge px-3 py-2 fw-bold shadow-sm"
                style={{
                  backgroundColor: product.color.toLowerCase(),
                  color: product.color.toLowerCase() === 'white' ? '#bfbfbf' : '#fff',
                }}
              >
                {product.color}
              </span>
            </div>
  
            {/* Price & Rating */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="d-flex align-items-center">
                {product.discount > 0 && (
                  <p className="fw-bold fs-6 text-muted mb-0 text-decoration-line-through me-2">
                    ${product.price}
                  </p>
                )}
                <p className="fw-bold fs-5 text-success mb-0">
                  ${product.finalPrice}
                </p>
              </div>
  
              {/* View Details Icon */}
              <Link
                to={`/product-details/${product._id}`}
                className="text-decoration-none"
              >
                <i className="fas fa-eye text-primary fs-5 p-2 rounded-circle bg-light shadow-sm"></i>
              </Link>
            </div>
  
            {/* Add to Cart Button */}
            <button
              className="btn btn-warning w-100 mt-4 fw-bold shadow-sm py-2 rounded-pill"
              onClick={handleAddToCart}
            >
              Add to Cart <i className="fas fa-shopping-cart ms-2"></i>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  };


import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/fresh.png";
import { UserContext } from "../../Context/userContext";
import { useContext } from "react";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    setUserToken(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img src={logo} width={95} className="me-2" alt="Alexa logo" />
        </Link>
  
        {/* Navbar Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
  
        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold" to="/categories">Categories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold" to="/brands">Brands</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold position-relative" to="/cart">
                    Cart 
                    {/* {counter > 0 && (
                      <span className="badge bg-primary ms-1">{counter}</span>
                    )} */}
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
  
          {/* Social Media Icons and Auth Buttons */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="d-flex align-items-center gap-3">
              <a href="https://www.facebook.com/DOMZ.2001/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-primary fs-5"></i>
              </a>
              <a href="https://x.com/AdhamGalal0" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-info fs-5"></i>
              </a>
              <a href="https://www.linkedin.com/in/adham-galal-a46384254" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-primary fs-5"></i>
              </a>
              <a href="https://github.com/adham025" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github text-dark fs-5"></i>
              </a>
            </div>
  
            {userToken ? (
              <li className="nav-item ms-3">
                <button className="btn btn-outline-primary px-4 rounded-pill d-flex align-items-center gap-2" onClick={handleLogout}>
                  <i className="fa fa-sign-out-alt"></i> Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item ms-3">
                  <NavLink className="btn btn-outline-primary px-4 rounded-pill" to="/login">Login</NavLink>
                </li>
                <li className="nav-item ms-2">
                  <NavLink className="btn btn-outline-primary px-4 rounded-pill" to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

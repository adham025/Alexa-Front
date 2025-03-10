import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
let {setUserToken} = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login(values) {
    try {
      setApiError(null);
      setLoading(true);
      let { data } = await axios.post(
        `https://alexa-back-production.up.railway.app/api/v1/auth/login`,
        values
      );
      if (data.message == "Success") {
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        navigate("/home");
      }
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="container w-50 mx-auto py-5">
        {/* Error Message */}
        {apiError && (
          <div className="alert alert-danger mb-4">
            {apiError}
          </div>
        )}
  
        {/* Form Title */}
        <h2 className="text-center display-4 mb-4">Login Now</h2>
  
        {/* Login Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-light p-4 rounded shadow-sm"
        >
          {/* Email Input */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
            >
              Enter your email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-danger small mt-2">
                {formik.errors.email}
              </div>
            )}
          </div>
  
          {/* Password Input */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
            >
              Enter your password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-danger small mt-2">
                {formik.errors.password}
              </div>
            )}
          </div>
  
          {/* Login Button and Register Link */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Login"
              )}
            </button>
  
            <span className="text-muted">
              Don't have an account yet?{" "}
              <Link
                className="text-primary text-decoration-none"
                to="/register"
              >
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function Register() {

  let navigate = useNavigate()
  const [apiError,setApiError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  async function register(values) {
    try {
      setApiError(null);
      setLoading(true);
      let { data } = await axios.post(
        `https://alexa-back-production.up.railway.app/api/v1/auth/signup`,
        values
      );
      if (data.message === "Success") {
        setSuccess(true); 
        formik.resetForm();
      }
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

let validationSchema = Yup.object({
  userName: Yup.string().min(3,"Name min length is 3").max(30, "Name max length is 30").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
  .matches(
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
    "Password must contain at least one letter, one number, and one special character (!@#$%^&*).")
  .required("Password is required"),
  cPassword: Yup.string()
  .oneOf([Yup.ref("password")], "Passwords do not match")
  .required("Confirm Password is required"),
})

  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema,
    onSubmit: register,
  });
  

  return (
    <>
      <div className="container w-50 mx-auto py-5">
        {/* Success Message */}
        {success && (
          <div className="alert alert-success mb-4">
            <p>Registration successful! Please check your email to verify your account.</p>
          </div>
        )}
  
        {/* Error Message */}
        {apiError && (
          <div className="alert alert-danger mb-4">
            {apiError}
          </div>
        )}
  
        {/* Form Title */}
        <h2 className="text-center display-4 mb-4">Register Now</h2>
  
        {/* Registration Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-light p-4 rounded shadow-sm"
        >
          {/* Name Input */}
          <div className="mb-3">
            <label
              htmlFor="userName"
              className="form-label"
            >
              Enter your name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter your name"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.userName && formik.touched.userName && (
              <div className="text-danger small mt-2">
                {formik.errors.userName}
              </div>
            )}
          </div>
  
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
  
          {/* Confirm Password Input */}
          <div className="mb-3">
            <label
              htmlFor="cPassword"
              className="form-label"
            >
              Repeat your password
            </label>
            <input
              type="password"
              className="form-control"
              id="cPassword"
              placeholder="Repeat your password"
              name="cPassword"
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.cPassword && formik.touched.cPassword && (
              <div className="text-danger small mt-2">
                {formik.errors.cPassword}
              </div>
            )}
          </div>
  
          {/* Register Button and Login Link */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              disabled={loading || !(formik.isValid && formik.dirty)}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Register"
              )}
            </button>
  
            <span className="text-muted">
              Already have an account?{" "}
              <Link
                className="text-primary text-decoration-none"
                to="/login"
              >
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );

}


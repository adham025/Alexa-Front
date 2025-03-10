import React from 'react'
import moto from '../../assets/images/moto.jpg'

export default function About() {

  return (
    <div className="container-fluid p-0">
      {/* About Us Header */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">About Us</h1>
          <p className="lead mb-0">
            We are passionate about motorcycles and dedicated to providing the best experience for our
            customers.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src={moto}
                alt="Our Mission"
                className="img-fluid rounded shadow-lg"
                width={500}
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="lead">
                At Alexa, our mission is to provide high-quality motorcycles and exceptional
                customer service. We believe in empowering riders to explore the world on two wheels.
              </p>
              <p>
                Whether you're a seasoned rider or just starting out, we have the perfect bike for
                you. Our team is here to guide you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


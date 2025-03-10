import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <section
        className="hero-section d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', 
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1 className="mb-3 fw-bold">Welcome to the Motorcycle Store</h1>
          <p className="lead mb-4">
            Find the best motorcycles for your adventure. Ride in style and power.
          </p>
          <Link to="/home" className="btn btn-primary btn-lg">
            Explore Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Landing;
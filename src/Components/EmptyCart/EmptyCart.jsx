import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import empty from '../../assets/images/empty.jpeg';

export default function EmptyCart() {
  const navigate = useNavigate(); 

  return (
    <div className="container text-center mt-5 p-4">
      <h5 className="text-muted">Looks like you haven't added anything to your cart yet.</h5>

      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <img height={350} className="w-75 rounded" src={empty} alt="Empty Cart" />
        </div>
      </div>

      {/* Continue Shopping Button */}
      <button
        className="btn btn-info mt-4 px-4 py-2 fw-bold text-white"
        onClick={() => navigate('/home')} 
      >
        Continue Shopping
        </button>
    </div>
  );
}

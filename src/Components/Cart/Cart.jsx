import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import EmptyCart from "../EmptyCart/EmptyCart";

export default function Cart() {
  const { removeFromCart, getLoggedUserCart, updateQuantity } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState({ cart: { bikes: [] } });

  async function getCart() {
    try {
      let { cart } = await getLoggedUserCart();
      setCartDetails(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  async function remove(bikeId) {
    try {
      let { cart } = await removeFromCart(bikeId);
      console.log("Removed From Cart:", cart.bikes);
      setCartDetails((prev) => ({
        ...prev,
        bikes: prev.bikes.filter((bike) => bike.bikeId._id !== bikeId),
      }));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  async function handleQuantityChange(bikeId, newQuantity, stock) {
    if (newQuantity > 0 && newQuantity <= stock) {
      try {
        let { success, cart } = await updateQuantity(bikeId, newQuantity);
  
        if (success && cart?.bikes) {
          setCartDetails((prev) => ({
            ...prev,
            bikes: prev.bikes.map((item) =>
              item.bikeId._id === bikeId ? { ...item, quantity: newQuantity } : item
            ),
          }));
        }
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  }
  

  // useEffect(() => {
  //   console.log("Updated Cart Details:", cartDetails);
  // }, [cartDetails]);

  const getTotalPrice = () => {
    return (
      cartDetails?.bikes?.reduce(
        (total, item) => total + (item.bikeId?.price || 0) * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <div className="container my-5">
      {cartDetails?.bikes?.length === 0 ? (
        <EmptyCart/>
      ) : (
        <div className="cart-items">
          {cartDetails?.bikes?.map((item) => {
            return (
              <div
                key={item._id}
                className="cart-item d-flex align-items-center mb-3 p-3 border shadow-sm rounded"
              >
                <img
                  src={item.bikeId?.images?.[0]}
                  alt={item.bikeId?.name}
                  className="cart-item-image"
                  style={{ width: "100px", height: "auto", marginRight: "15px" }}
                />
                <div className="flex-grow-1">
                  <h5>{item.bikeId?.name}</h5>
                  <p>Price: ${(item.bikeId?.finalPrice || 0) * item.quantity}</p>
                  <p>Stock Available: {item.bikeId.stock}</p>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={() =>
                      handleQuantityChange(item.bikeId._id, item.quantity - 1, item.bikeId.stock)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={() =>
                      handleQuantityChange(item.bikeId._id, item.quantity + 1, item.bikeId.stock)
                    }
                    disabled={item.quantity >= item.bikeId.stock} 
                  >
                    +
                  </button>

                  <button className="btn btn-danger ms-3" onClick={() => remove(item.bikeId._id)}>
              <i className="fa fa-trash me-1"></i> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartDetails?.bikes?.length > 0 && (
        <div className="d-flex justify-content-between mt-4">
          <h3>Total Price: ${getTotalPrice()}</h3>
          <button className="btn btn-primary">
          <i className="fa fa-shopping-cart me-2"></i> Checkout
          </button>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../reduxContainer/CartActions";
import "../../styles/Cart.css";
import { createOrder } from "../../services/marketplaceService";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalAmount = useSelector((state) => state.totalAmount);
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const dispatch = useDispatch();

  // Handle removing item from cart
  const handleRemoveFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  };

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    const updatedQuantity = parseInt(quantity);
    if (updatedQuantity === 0) {
      if (window.confirm("Are you sure you want to remove this item from your cart?")) {
        handleRemoveFromCart(id);
      } else {
        return
      }
    }
    if (updatedQuantity >= 1) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        payload: { id, quantity: updatedQuantity },
      });
    }
  };

  const handleCheckout = async () => {
    // Handle checkout logic here
    console.log("Checkout clicked!");
    console.log("Cart Items:", cartItems);
    await createOrder(cartItems);
    
  };

  

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty! 🛒</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((product) => (
              <div className="cart-item" key={product.id}>
                <div className="cart-item-info">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Seller: {product.sellerId}</p>
                  <div className="quantity-section">
                    <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="0"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                    />
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>
              <strong>Total Quantity:</strong> {totalQuantity}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
            </p>
            <button onClick={()=> handleCheckout()} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

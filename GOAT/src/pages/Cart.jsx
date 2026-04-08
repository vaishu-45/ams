import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getUser, BASE } from "../utils/api.js";
import "../styles/Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const navigate = useNavigate();
  const user = getUser();

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "GOAT10") {
      setCouponMsg("✓ 10% discount applied!");
    } else {
      setCouponMsg("Invalid coupon code.");
    }
  };

  const discount = couponMsg.includes("10%") ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice - discount;

  return (
    <div className="cart-page">

      {/* Breadcrumb */}
      <p className="cart-breadcrumb">
        <Link to="/">Home</Link> / <span className="cart-bc-active">Cart</span>
      </p>

      <div className="cart-layout">

        {/* ── LEFT: Cart Items ── */}
        <div className="cart-items-col">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="cart-shop-btn">Shop Now</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <img
                  src={`${BASE}${item.image}`}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-weight">{item.weight}</p>
                  <p className="cart-item-desc">{item.description}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <div className="cart-item-right">
                  <div className="qty-control">
                    <button onClick={() => updateQty(item._id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── RIGHT: Order Summary ── */}
        {cartItems.length > 0 && (
          <div className="cart-summary-col">
            <div className="summary-header">
              <h3>Order Summary</h3>
              <div className="summary-logo">🐐</div>
            </div>

            {/* Item list */}
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Coupon */}
            <div className="coupon-row">
              <input
                type="text"
                placeholder="Add Coupon +"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="coupon-input"
              />
              <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
            </div>
            {couponMsg && (
              <p className={`coupon-msg ${couponMsg.includes("✓") ? "valid" : "invalid"}`}>
                {couponMsg}
              </p>
            )}

            <hr className="summary-divider" />

            {discount > 0 && (
              <div className="summary-row">
                <span>Discount</span>
                <span className="discount-val">− ₹{discount}</span>
              </div>
            )}

            <div className="summary-total-row">
              <span>Total Amount</span>
              <span>₹{finalTotal}/-</span>
            </div>

            <button className="checkout-btn" onClick={() => {
              if (!user) { alert("Please login to proceed."); return; }
              navigate("/Checkout");
            }}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

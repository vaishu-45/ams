import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getToken, getUser } from "../utils/api.js";
import "../styles/Checkout.css";

const STEPS = ["Delivery", "Payment", "Confirm"];

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const user = getUser();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  if (cartItems.length === 0 && !orderId) {
    return (
      <div className="chk-empty">
        <p>Your cart is empty.</p>
        <Link to="/" className="chk-back-btn">Shop Now</Link>
      </div>
    );
  }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const placeOrder = async () => {
    setLoading(true); setError("");
    try {
      const token = getToken();
      if (!token) { navigate("/"); return; }

      const items = cartItems.map(i => ({
        product: i._id,
        name: i.name,
        image: i.image || "",
        price: i.price,
        quantity: i.quantity,
      }));

      const res = await fetch(`${import.meta.env.VITE_API_URL || "https://ams-6oyz.onrender.com/api"}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items,
          deliveryAddress: `${form.address}, ${form.city} - ${form.pincode}`,
          phone: form.phone,
          paymentMethod: form.paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOrderId(data._id);
      clearCart();
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 0: Delivery ──
  const StepDelivery = () => (
    <div className="chk-form">
      <h3 className="chk-step-title">Delivery Details</h3>
      <div className="chk-row">
        <div className="chk-field">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
        </div>
        <div className="chk-field">
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="10-digit number" />
        </div>
      </div>
      <div className="chk-field chk-full">
        <label>Address</label>
        <input name="address" value={form.address} onChange={handleChange} required placeholder="House no, Street, Area" />
      </div>
      <div className="chk-row">
        <div className="chk-field">
          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} required placeholder="City" />
        </div>
        <div className="chk-field">
          <label>Pincode</label>
          <input name="pincode" value={form.pincode} onChange={handleChange} required placeholder="Pincode" maxLength={6} />
        </div>
      </div>
      <button
        className="chk-next-btn"
        onClick={() => {
          if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
            setError("Please fill all fields."); return;
          }
          setError(""); setStep(1);
        }}
      >Continue to Payment →</button>
    </div>
  );

  // ── Step 1: Payment ──
  const StepPayment = () => (
    <div className="chk-form">
      <h3 className="chk-step-title">Payment Method</h3>
      <div className="chk-payment-options">
        {[
          { value: "cod",    label: "💵 Cash on Delivery", desc: "Pay when your order arrives" },
          { value: "online", label: "💳 Online Payment",   desc: "UPI / Card / Net Banking" },
        ].map(opt => (
          <label key={opt.value} className={`chk-pay-card ${form.paymentMethod === opt.value ? "selected" : ""}`}>
            <input type="radio" name="paymentMethod" value={opt.value} checked={form.paymentMethod === opt.value} onChange={handleChange} />
            <div>
              <p className="pay-label">{opt.label}</p>
              <p className="pay-desc">{opt.desc}</p>
            </div>
          </label>
        ))}
      </div>
      {form.paymentMethod === "online" && (
        <div className="chk-upi-box">
          <p>UPI ID: <strong>adarshMutton@upi</strong></p>
          <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 4 }}>After payment, proceed to confirm order.</p>
        </div>
      )}
      <div className="chk-btn-row">
        <button className="chk-back-link" onClick={() => setStep(0)}>← Back</button>
        <button className="chk-next-btn" onClick={() => { setError(""); setStep(2); }}>Review Order →</button>
      </div>
    </div>
  );

  // ── Step 2: Confirm ──
  const StepConfirm = () => (
    <div className="chk-form">
      <h3 className="chk-step-title">Review & Confirm</h3>
      <div className="chk-review-box">
        <p><span>Name</span><strong>{form.name}</strong></p>
        <p><span>Phone</span><strong>{form.phone}</strong></p>
        <p><span>Address</span><strong>{form.address}, {form.city} - {form.pincode}</strong></p>
        <p><span>Payment</span><strong>{form.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</strong></p>
      </div>
      <div className="chk-items-review">
        {cartItems.map(i => (
          <div key={i._id} className="chk-item-row">
            <span>{i.name} × {i.quantity}</span>
            <span>₹{i.price * i.quantity}</span>
          </div>
        ))}
        <div className="chk-item-row chk-total-row">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>
      {error && <p className="chk-error">{error}</p>}
      <div className="chk-btn-row">
        <button className="chk-back-link" onClick={() => setStep(1)}>← Back</button>
        <button className="chk-next-btn" onClick={placeOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order ✓"}
        </button>
      </div>
    </div>
  );

  // ── Step 3: Success ──
  const StepSuccess = () => (
    <div className="chk-success">
      <div className="chk-success-icon">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you, <strong>{form.name}</strong>! Your order has been received.</p>
      <p className="chk-order-id">Order ID: <strong>{orderId?.slice(-8).toUpperCase()}</strong></p>
      <p className="chk-delivery-note">🚚 Expected delivery: <strong>2–4 hours</strong></p>
      <div className="chk-success-btns">
        <Link to="/Profile" className="chk-next-btn">View My Orders</Link>
        <Link to="/" className="chk-outline-btn">Continue Shopping</Link>
      </div>
    </div>
  );

  return (
    <div className="chk-page">
      <p className="chk-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/Cart">Cart</Link> / <span>Checkout</span>
      </p>

      <div className="chk-layout">
        {/* Left: Steps */}
        <div className="chk-left">
          {/* Progress bar */}
          {step < 3 && (
            <div className="chk-progress">
              {STEPS.map((s, i) => (
                <div key={s} className={`chk-prog-step ${i <= step ? "done" : ""}`}>
                  <div className="chk-prog-dot">{i < step ? "✓" : i + 1}</div>
                  <span>{s}</span>
                  {i < STEPS.length - 1 && <div className="chk-prog-line" />}
                </div>
              ))}
            </div>
          )}

          {step === 0 && <StepDelivery />}
          {step === 1 && <StepPayment />}
          {step === 2 && <StepConfirm />}
          {step === 3 && <StepSuccess />}
        </div>

        {/* Right: Order summary (hide on success) */}
        {step < 3 && (
          <div className="chk-summary">
            <h3>Order Summary</h3>
            {cartItems.map(i => (
              <div key={i._id} className="chk-sum-row">
                <span>{i.name} × {i.quantity}</span>
                <span>₹{i.price * i.quantity}</span>
              </div>
            ))}
            <hr />
            <div className="chk-sum-total">
              <span>Total</span>
              <strong>₹{totalPrice}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

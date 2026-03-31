import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getToken } from "../utils/api.js";
import "../styles/OrderTracking.css";

const STEPS = [
  { key: "pending",    label: "Order Placed",     icon: "📋", desc: "Your order has been received." },
  { key: "confirmed",  label: "Order Confirmed",  icon: "✅", desc: "Shop has confirmed your order." },
  { key: "processing", label: "Being Prepared",   icon: "🔪", desc: "Your mutton is being freshly cut & packed." },
  { key: "delivered",  label: "Delivered",        icon: "🎉", desc: "Order delivered successfully!" },
];

const CANCELLED = { key: "cancelled", label: "Cancelled", icon: "❌", desc: "This order was cancelled." };

const stepIndex = (status) => STEPS.findIndex(s => s.key === status);

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.message) setError(data.message);
        else setOrder(data);
      })
      .catch(() => setError("Failed to load order."));
  }, [id]);

  if (error) return <div className="trk-error"><p>{error}</p><Link to="/Profile">← My Orders</Link></div>;
  if (!order) return <div className="trk-loading">Loading...</div>;

  const isCancelled = order.status === "cancelled";
  const currentIdx  = isCancelled ? -1 : stepIndex(order.status);

  return (
    <div className="trk-page">
      <p className="trk-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/Profile">My Orders</Link> / <span>Track Order</span>
      </p>

      <div className="trk-layout">

        {/* ── Left: Timeline ── */}
        <div className="trk-card trk-timeline-card">
          <div className="trk-header">
            <h2>Track Order</h2>
            <span className="trk-order-id">#{order._id.slice(-8).toUpperCase()}</span>
          </div>

          {isCancelled ? (
            <div className="trk-cancelled">
              <span className="trk-step-icon cancelled">❌</span>
              <div>
                <p className="trk-step-label">Order Cancelled</p>
                <p className="trk-step-desc">This order has been cancelled.</p>
              </div>
            </div>
          ) : (
            <div className="trk-timeline">
              {STEPS.map((step, i) => {
                const done    = i <= currentIdx;
                const active  = i === currentIdx;
                return (
                  <div key={step.key} className={`trk-step ${done ? "done" : ""} ${active ? "active" : ""}`}>
                    <div className="trk-step-left">
                      <div className="trk-step-icon">{done ? (active ? step.icon : "✓") : step.icon}</div>
                      {i < STEPS.length - 1 && <div className="trk-step-line" />}
                    </div>
                    <div className="trk-step-body">
                      <p className="trk-step-label">{step.label}</p>
                      <p className="trk-step-desc">{step.desc}</p>
                      {active && <span className="trk-current-badge">Current Status</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Right: Order Details ── */}
        <div className="trk-card trk-details-card">
          <h3 className="trk-section-title">Order Details</h3>

          <div className="trk-info-row"><span>Order ID</span><strong>#{order._id.slice(-8).toUpperCase()}</strong></div>
          <div className="trk-info-row"><span>Date</span><strong>{new Date(order.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</strong></div>
          <div className="trk-info-row"><span>Payment</span><strong>{order.paymentMethod.toUpperCase()} / <span className={order.paymentStatus === "paid" ? "trk-paid" : "trk-unpaid"}>{order.paymentStatus}</span></strong></div>
          <div className="trk-info-row"><span>Address</span><strong>{order.deliveryAddress}</strong></div>
          <div className="trk-info-row"><span>Phone</span><strong>{order.phone}</strong></div>

          <hr className="trk-divider" />

          <h3 className="trk-section-title">Items</h3>
          {order.items.map((item, i) => (
            <div key={i} className="trk-item-row">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="trk-total-row">
            <span>Total</span>
            <strong>₹{order.totalAmount}</strong>
          </div>

          <Link to="/Profile" className="trk-back-btn">← Back to My Orders</Link>
        </div>

      </div>
    </div>
  );
}

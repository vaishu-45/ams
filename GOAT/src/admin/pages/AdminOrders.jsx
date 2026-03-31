import { useEffect, useState } from "react";
import { getToken } from "../../utils/api.js";

const BASE = "http://localhost:5000";
const h = () => ({ Authorization: `Bearer ${getToken()}` });

const STATUSES = ["pending", "confirmed", "processing", "delivered", "cancelled"];

const badgeClass = { pending:"badge-yellow", confirmed:"badge-blue", processing:"badge-blue", delivered:"badge-green", cancelled:"badge-red" };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const load = () => fetch(`${BASE}/api/admin/orders`, { headers: h() }).then(r => r.json()).then(setOrders);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${BASE}/api/admin/orders/${id}/status`, {
      method: "PUT",
      headers: { ...h(), "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const markPaid = async (id) => {
    await fetch(`${BASE}/api/admin/orders/${id}/payment`, {
      method: "PUT",
      headers: { ...h(), "Content-Type": "application/json" },
    });
    load();
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 20 }}>Orders ({orders.length})</h2>

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Phone</th>
              <th>Amount</th><th>Payment</th><th>Status</th><th>Update</th><th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#aaa", padding: 24 }}>No orders yet</td></tr>
            ) : orders.map(o => (
              <>
                <tr key={o._id}>
                  <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{o._id.slice(-8).toUpperCase()}</td>
                  <td>{o.user?.name || "—"}</td>
                  <td>{o.phone}</td>
                  <td>₹{o.totalAmount}</td>
                  <td><span className={`badge ${o.paymentStatus === "paid" ? "badge-green" : "badge-yellow"}`}>{o.paymentMethod} / {o.paymentStatus}</span>
                    {o.paymentStatus !== "paid" && (
                      <button className="adm-btn adm-btn-success adm-btn-sm" style={{marginLeft:6}} onClick={() => markPaid(o._id)}>Mark Paid</button>
                    )}
                  </td>
                  <td><span className={`badge ${badgeClass[o.status]}`}>{o.status}</span></td>
                  <td>
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o._id, e.target.value)}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontSize: "0.82rem" }}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="adm-btn adm-btn-sm" style={{ background: "#f0f0f0", color: "#555" }}
                      onClick={() => setExpanded(expanded === o._id ? null : o._id)}>
                      {expanded === o._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
                {expanded === o._id && (
                  <tr key={`${o._id}-detail`}>
                    <td colSpan={8} style={{ background: "#fafafa", padding: "12px 20px" }}>
                      <strong>Address:</strong> {o.deliveryAddress}<br />
                      <strong>Items:</strong>
                      <ul style={{ margin: "6px 0 0 16px" }}>
                        {o.items.map((item, i) => (
                          <li key={i}>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

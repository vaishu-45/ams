import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchProfile, updateProfile, fetchMyOrders, removeToken, removeUser, getUser, getToken, BASE } from "../utils/api.js";
import "../styles/Profile.css";

const TABS = ["Order History", "Rewards", "Saved Address", "Wallet"];

// returns minutes since order was placed
const minutesSince = (createdAt) => (Date.now() - new Date(createdAt).getTime()) / 60000;

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Order History");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [cancelMsg, setCancelMsg] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const local = getUser();
    if (!local) { navigate("/"); return; }
    fetchProfile()
      .then((data) => { setUser(data); setForm({ name: data.name, phone: data.phone || "", address: data.address || "" }); })
      .catch(() => navigate("/"));
    fetchMyOrders().then(setOrders).catch(() => {});
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); setError("");
    try { const updated = await updateProfile(form); setUser(updated); setEditing(false); }
    catch (err) { setError(err.message); }
  };

  const handleLogout = () => { removeToken(); removeUser(); navigate("/"); window.location.reload(); };

  const handleCancel = async (order) => {
    if (minutesSince(order.createdAt) > 5) {
      setCancelMsg(m => ({ ...m, [order._id]: "❌ Cannot cancel after 5 minutes." }));
      return;
    }
    if (!window.confirm("Cancel this order?")) return;
    try {
      const res = await fetch(`${BASE}/api/orders/${order._id}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCancelMsg(m => ({ ...m, [order._id]: "✓ Order cancelled." }));
      fetchMyOrders().then(setOrders);
    } catch (err) {
      setCancelMsg(m => ({ ...m, [order._id]: err.message }));
    }
  };

  const statusIcon = (s) => ({ pending:"🟡", confirmed:"🔵", processing:"🔵", delivered:"🟢", cancelled:"🔴" }[s] || "⚪");

  if (!user) return <p className="profile-loading">Loading...</p>;

  return (
    <div className="profile-page">

      {/* ── Top Banner ── */}
      <div className="profile-banner">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
        </div>
        <div className="profile-info">
          <h2 className="profile-hello">Hello, {user.name}</h2>
          <p className="profile-phone">{user.phone}</p>
          {user.email && <p className="profile-email">{user.email}</p>}
        </div>
        <div className="profile-actions">
          <button className="btn-edit" onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* ── Edit Form ── */}
      {editing && (
        <form className="profile-edit-form" onSubmit={handleUpdate}>
          {error && <p className="profile-error">{error}</p>}
          <div className="edit-row">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="edit-row">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="edit-row">
            <label>Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Add delivery address" />
          </div>
          <button type="submit" className="btn-save">Save Changes</button>
        </form>
      )}

      {/* ── Body: Sidebar + Content ── */}
      <div className="profile-body">

        {/* Sidebar */}
        <aside className="profile-sidebar">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`sidebar-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <button className="sidebar-tab sidebar-logout" onClick={handleLogout}>Logout</button>
        </aside>

        {/* Main content */}
        <main className="profile-content">
          {activeTab === "Order History" && (
            <div>
              <h3 className="content-title">Your Orders</h3>
              {orders.length === 0 ? (
                <p className="no-orders">No orders yet. Start shopping!</p>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <p className="order-status">
                      {statusIcon(order.status)}{" "}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                    <div className="order-row">
                      <div className="order-items-list">
                        {order.items.map((item, i) => (
                          <div key={i} className="order-item">
                            {item.image && <img src={`${BASE}${item.image}`} alt={item.name} className="order-item-img" />}
                            <p>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                      <p className="order-total">Total: ₹{order.totalAmount}</p>
                    </div>
                    {cancelMsg[order._id] && (
                      <p className={`cancel-msg ${cancelMsg[order._id].startsWith("✓") ? "cancel-ok" : "cancel-err"}`}>
                        {cancelMsg[order._id]}
                      </p>
                    )}
                    <div className="order-btns">
                      <Link to={`/track/${order._id}`} className="btn-track">Track</Link>
                      {order.status !== "cancelled" && order.status !== "delivered" && (
                        minutesSince(order.createdAt) <= 5
                          ? <button className="btn-cancel" onClick={() => handleCancel(order)}>Cancel</button>
                          : <button className="btn-cancel btn-cancel-disabled" disabled title="Cannot cancel after 5 minutes">Cancel</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "Rewards" && (
            <div>
              <h3 className="content-title">Rewards</h3>
              <p className="tab-placeholder">Your rewards and points will appear here.</p>
            </div>
          )}

          {activeTab === "Saved Address" && (
            <div>
              <h3 className="content-title">Saved Address</h3>
              <p className="tab-placeholder">{user.address || "No address saved yet."}</p>
            </div>
          )}

          {activeTab === "Wallet" && (
            <div>
              <h3 className="content-title">Wallet</h3>
              <p className="tab-placeholder">Wallet balance: ₹0.00</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;

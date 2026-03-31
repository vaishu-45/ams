import { useEffect, useState } from "react";
import { getToken } from "../../utils/api.js";

const statusBadge = (s) => {
  const map = { pending:"badge-yellow", confirmed:"badge-blue", processing:"badge-blue", delivered:"badge-green", cancelled:"badge-red" };
  return <span className={`badge ${map[s] || "badge-grey"}`}>{s}</span>;
};

export default function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, delivered: 0, transit: 0, products: 0, customers: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const h = { Authorization: `Bearer ${getToken()}` };

    Promise.all([
      fetch("http://localhost:5000/api/admin/orders",   { headers: h }).then(r => r.json()),
      fetch("http://localhost:5000/api/admin/products", { headers: h }).then(r => r.json()),
      fetch("http://localhost:5000/api/admin/users",    { headers: h }).then(r => r.json()),
    ]).then(([orders, products, users]) => {
      setStats({
        orders:    orders.length,
        delivered: orders.filter(o => o.status === "delivered").length,
        transit:   orders.filter(o => o.status === "processing" || o.status === "confirmed").length,
        products:  products.length,
        customers: users.length,
      });
      setRecentOrders(orders.slice(0, 5));
    }).catch(console.error);
  }, []);

  return (
    <div>
      {/* Stats */}
      <div className="adm-stats">
        {[
          { label: "Total Orders",     value: stats.orders,    icon: "📦" },
          { label: "Delivered",        value: stats.delivered, icon: "✅" },
          { label: "In Transit",       value: stats.transit,   icon: "🚚" },
          { label: "Total Products",   value: stats.products,  icon: "🥩" },
          { label: "Customers",        value: stats.customers, icon: "👥" },
        ].map((s) => (
          <div className="adm-stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="adm-card">
        <p className="adm-card-title">Recent Orders</p>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", color: "#aaa" }}>No orders yet</td></tr>
            ) : recentOrders.map((o) => (
              <tr key={o._id}>
                <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{o._id.slice(-6).toUpperCase()}</td>
                <td>{o.user?.name || "—"}</td>
                <td>{o.items.map(i => i.name).join(", ")}</td>
                <td>₹{o.totalAmount}</td>
                <td>{statusBadge(o.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

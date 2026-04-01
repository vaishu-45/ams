import { useEffect, useState } from "react";
import { getToken } from "../../utils/api.js";

const BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "https://ams-6oyz.onrender.com";
const h = () => ({ Authorization: `Bearer ${getToken()}` });

export default function AdminCustomers() {
  const [users, setUsers] = useState([]);

  const load = () => fetch(`${BASE}/api/admin/users`, { headers: h() }).then(r => r.json()).then(setUsers);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`${BASE}/api/admin/users/${id}`, { method: "DELETE", headers: h() });
    load();
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 20 }}>Customers ({users.length})</h2>

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td>{u.phone || "—"}</td>
                <td>{u.email || "—"}</td>
                <td><span className={`badge ${u.role === "admin" ? "badge-blue" : "badge-grey"}`}>{u.role}</span></td>
                <td style={{ fontSize: "0.8rem", color: "#aaa" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u.role !== "admin" && (
                    <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => handleDelete(u._id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../utils/api.js";
import {
  LayoutDashboard, ShoppingBag, Package, Tag, Users, Settings, LogOut, Menu, X
} from "lucide-react";
import "./admin.css";

const links = [
  { to: "/admin",            label: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
  { to: "/admin/orders",     label: "Orders",    icon: <ShoppingBag size={18} /> },
  { to: "/admin/products",   label: "Products",  icon: <Package size={18} /> },
  { to: "/admin/categories", label: "Categories",icon: <Tag size={18} /> },
  { to: "/admin/customers",  label: "Customers", icon: <Users size={18} /> },
  { to: "/admin/settings",   label: "Settings",  icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();
  const [open, setOpen] = useState(true);

  if (!user || user.role !== "admin") {
    return (
      <div className="adm-denied">
        <h2>Access Denied</h2>
        <p>You need admin privileges to view this page.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const handleLogout = () => {
    removeToken(); removeUser();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={`adm-shell ${open ? "sidebar-open" : "sidebar-closed"}`}>
      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-top">
          <div className="adm-logo">
            {open ? <span>🐐 Admin</span> : <span>🐐</span>}
          </div>
          <button className="adm-toggle" onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="adm-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `adm-link ${isActive ? "active" : ""}`}
            >
              {l.icon}
              {open && <span>{l.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button className="adm-logout" onClick={handleLogout}>
          <LogOut size={18} />
          {open && <span>Logout</span>}
        </button>
      </aside>

      {/* ── Main ── */}
      <div className="adm-main">
        <header className="adm-header">
          <h1 className="adm-page-title">Admin Panel</h1>
          <div className="adm-user-badge">
            <div className="adm-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <span>{user.name}</span>
          </div>
        </header>
        <div className="adm-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MapPin, UserCircle } from "lucide-react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/Logo.png";
import "../styles/NavBar.css";
import LoginPopup from "../components/LoginPopUp";
import NavLocation from "./NavLocation";
import { getUser } from "../utils/api.js";
import { useCart } from "../context/CartContext.jsx";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const user = getUser();
  const { totalItems } = useCart();

  // Debounced search
  useEffect(() => {
    if (!query.trim()) { setResults([]); setShowDrop(false); return; }
    const t = setTimeout(() => {
      fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(data => { setResults(data); setShowDrop(true); })
        .catch(() => {});
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (!searchRef.current?.contains(e.target)) setShowDrop(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (product) => {
    setQuery("");
    setShowDrop(false);
    navigate(`/products/${encodeURIComponent(product.category)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) handleSelect(results[0]);
  };

  return (
    <nav className="navbar bg-black text-white py-2 md:py-4 lg:py-6 flex justify-between items-center h-40">
      {/* Logo */}
      <div className="navbar-logo navbar-brand items-center w-40 h-40">
        <Link to="/"><img src={Logo} alt="Adarsh Mutton Shop Logo" className="logo-img" /></Link>
      </div>

      {/* Center */}
      <div className="navbar-center flex flex-row justify-center items-center gap-8">
        <div className="navbar-location flex items-center gap-1">
          <MapPin size={18} className="icon" />
          <NavLocation className="location-component" />
        </div>

        {/* Search with dropdown */}
        <div className="navbar-search-wrap" ref={searchRef}>
          <form className="navbar-search border-1.5 flex items-center gap-2 bg-black rounded px-2" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="What do you want to order today ???....."
              className="input-search text-white outline-none py-1 w-64 h-7"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setShowDrop(true)}
            />
            <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
              <Search size={18} className="icon text-white" />
            </button>
          </form>

          {/* Dropdown results */}
          {showDrop && results.length > 0 && (
            <div className="search-dropdown">
              {results.map(p => (
                <div key={p._id} className="search-result-item" onClick={() => handleSelect(p)}>
                  <img src={`http://localhost:5000${p.image}`} alt={p.name} className="search-result-img" />
                  <div className="search-result-info">
                    <p className="search-result-name">{p.name}</p>
                    <p className="search-result-cat">{p.category} · ₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showDrop && query.trim() && results.length === 0 && (
            <div className="search-dropdown">
              <p className="search-no-result">No products found for "{query}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger */}
      <button className="ham-menu md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Right links */}
      <div className="nav-links">
        <Link to="/Cart" className="nav-link flex items-center gap-1" style={{ position: "relative" }}>
          <ShoppingCart size={18} /> Cart
          {totalItems > 0 && (
            <span style={{
              position: "absolute", top: "-8px", right: "-10px",
              background: "#c0392b", color: "#fff", borderRadius: "50%",
              width: "18px", height: "18px", fontSize: "0.65rem",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
            }}>{totalItems}</span>
          )}
        </Link>
        <Link to="/AboutUs" className="nav-link">AboutUs</Link>
        {user ? (
          <Link to="/Profile" className="nav-link flex items-center gap-1">
            <UserCircle size={18} /> {user.name.split(" ")[0]}
          </Link>
        ) : (
          <a href="#login" onClick={(e) => { e.preventDefault(); setShowLogin(true); }} className="login-link">Login</a>
        )}
      </div>

      <LoginPopup visible={showLogin} onClose={() => setShowLogin(false)} />

      {/* Mobile menu */}
      {isOpen && (
        <div className="mob-nav-links w-screen md:hidden flex flex-col pb-4 text-lg bg-black">
          <Link to="/Cart" className="mob-ek nav-link flex items-center gap-1"><ShoppingCart size={18} /> Cart</Link>
          <Link to="/AboutUs" className="mob-ek nav-link">AboutUs</Link>
          {user ? (
            <Link to="/Profile" className="mob-ek nav-link flex items-center gap-1"><UserCircle size={18} /> {user.name.split(" ")[0]}</Link>
          ) : (
            <a href="#login" onClick={(e) => { e.preventDefault(); setShowLogin(true); }} className="login-link">Login</a>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

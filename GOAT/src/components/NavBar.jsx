import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, MapPin } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import Logo from "../assets/Logo.png";
import "../styles/NavBar.css";
import LoginPopup from "../components/LoginPopUp";
import NavLocation from "./NavLocation";

const NavBar = () => {
  // State to control login popup visibility
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <nav className="navbar bg-black text-white py-2 md:py-4 lg:py-6 flex justify-between items-center h-40">
      {/* Logo */}
      <div className="navbar-logo navbar-brand items-center w-40 h-40">
        <Link to="/">
          <img src={Logo} alt="Adarsh Mutton Shop Logo" className="logo-img " />
        </Link>
      </div>

      {/* Center Section: Location + Search */}
      <div className="navbar-center flex flex-row justify-center items-center gap-8">
        <div className="navbar-location flex items-center gap-1">
          <MapPin size={18} className="icon" />
          <NavLocation className="location-component"/>
        </div>

        <div className="navbar-search border-1.5 flex items-center gap-2 bg-black rounded px-2">
          <input
            type="text"
            placeholder={
              window.innerWidth < 768
                ? "search here !!"
                : "What do you want to order today ???....."
            }
            className="input-search text-white outline-none py-1 w-64 h-7"
          />
          <Search size={18} className="icon text-black" />
        </div>
      </div>

      {/* Hamburger Icon (visible on small screens) */}
      <button
        className="ham-menu md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Right side links */}
      <div className="nav-links ">

        <Link to="/Cart" id="nav-link-cart" className="nav-link flex items-center gap-1">
          <ShoppingCart size={18} /> Cart
           {cartItems.length > 0 && <span className="cart-dot">{cartItems.length}</span>}
        </Link>

        <Link to="/AboutUs" className="nav-link">
          AboutUs
        </Link>

        {/* Login Link */}
        <a
          href="#login"
          onClick={(e) => {
            e.preventDefault(); // prevent default anchor navigation
            setShowLogin(true);
          }}
          className="login-link"
        >
          Login
        </a>
      </div>

      {/* Login Popup */}
      <LoginPopup visible={showLogin} onClose={() => setShowLogin(false)} />


      {isOpen && (

        <div className="mob-nav-links w-screen md:hidden flex flex-col pb-4 text-lg bg-black">

          <Link to="/Cart" className="mob-ek nav-link flex items-center gap-1">
            <ShoppingCart size={18} /> Cart
          </Link>

          <Link to="/AboutUs" className="mob-ek nav-link">
            AboutUs
          </Link>

          {/* Login Link */}
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault(); // prevent default anchor navigation
              setShowLogin(true);
            }}
            className="login-link"
          >
            Login
          </a>
        </div>

      )}


    </nav>
  );
};

export default NavBar;
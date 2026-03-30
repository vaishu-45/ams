import React, { useState, useEffect } from "react";
import "../styles/LoginPopup.css";
import logoPlaceholder from "../assets/log.png";

export default function LoginPopup({ visible = true, onClose }) {
  const [mobile, setMobile] = useState("");
  const [isMounted, setIsMounted] = useState(false); // for smooth slide-in

  // Trigger mount/unmount animations
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    } else {
      // Delay unmount to allow slide-out animation
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleProceed = (e) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, "");
    if (!/^[0-9]{10,15}$/.test(cleaned)) {
      alert("Please enter a valid mobile number");
      return;
    }
    console.log("Proceed with mobile:", cleaned);
    alert("OTP would be sent to: " + cleaned);
  };

  if (!isMounted) return null;

  return (
    <div className={`lp-sidebackdrop ${visible ? "visible" : ""}`} onClick={onClose}>
      <div
        className={`lp-sidecontainer ${visible ? "slide-in" : "slide-out"}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lp-logo-wrap">
          <img
            src={logoPlaceholder}
            alt="logo"
            className="lp-logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <h2 className="lp-title">Sign In/Sign Up</h2>

        <form className="lp-form" onSubmit={handleProceed}>
          <label className="lp-label" htmlFor="mobile">
            Mobile Number
          </label>

          <input
            id="mobile"
            className="lp-input"
            type="tel"
            inputMode="numeric"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength={15}
          />

          <button className="lp-cta" type="submit">
            Proceed Via OTP
          </button>

          <p className="lp-terms">
            By signing in you agree to our{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Open terms and conditions");
              }}
            >
              terms and conditions
            </a>
          </p>
        </form>

        <button
          className="lp-close"
          aria-label="Close"
          onClick={onClose}
          title="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

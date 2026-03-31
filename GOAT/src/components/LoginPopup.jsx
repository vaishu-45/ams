import React, { useState, useEffect } from "react";
import "../styles/LoginPopup.css";
import logoPlaceholder from "../assets/log.png";
import { loginUser, registerUser, setToken, setUser as saveUser } from "../utils/api.js";

export default function LoginPopup({ visible = true, onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (visible) setIsMounted(true);
    else {
      const t = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload =
        mode === "login"
          ? { phone: form.phone, password: form.password }
          : { name: form.name, phone: form.phone, password: form.password };

      const data =
        mode === "login" ? await loginUser(payload) : await registerUser(payload);

      setToken(data.token);
      saveUser({ _id: data._id, name: data.name, phone: data.phone, role: data.role });
      onClose();
      window.location.reload(); // refresh to reflect login state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <img src={logoPlaceholder} alt="logo" className="lp-logo" />
        </div>

        <h2 className="lp-title">{mode === "login" ? "Sign In" : "Sign Up"}</h2>

        {error && <p style={{ color: "red", fontSize: "0.85rem", marginBottom: 8 }}>{error}</p>}

        <form className="lp-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label className="lp-label" htmlFor="name">Name</label>
              <input
                id="name" name="name" className="lp-input" type="text"
                placeholder="Your name" value={form.name} onChange={handleChange} required
              />
            </>
          )}

          <label className="lp-label" htmlFor="phone">Mobile Number</label>
          <input
            id="phone" name="phone" className="lp-input" type="tel" inputMode="numeric"
            placeholder="Enter mobile number" value={form.phone} onChange={handleChange}
            maxLength={15} required
          />

          <label className="lp-label" htmlFor="password">Password</label>
          <input
            id="password" name="password" className="lp-input" type="password"
            placeholder="Enter password" value={form.password} onChange={handleChange} required
          />

          <button className="lp-cta" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 12, fontSize: "0.85rem" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontWeight: 600 }}
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>

        <p className="lp-terms">
          By signing in you agree to our <a href="#">terms and conditions</a>
        </p>

        <button className="lp-close" aria-label="Close" onClick={onClose} title="Close">✕</button>
      </div>
    </div>
  );
}

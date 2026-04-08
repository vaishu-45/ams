import React, { useState, useEffect } from "react";
import "../styles/LoginPopup.css";
import logoPlaceholder from "../assets/log.png";
import { loginUser, registerUser, setToken, setUser as saveUser, BASE_URL } from "../utils/api.js";

export default function LoginPopup({ visible = true, onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot" | "reset"
  const [form, setForm] = useState({ name: "", phone: "", password: "", otp: "", newPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const switchMode = (m) => { setMode(m); setError(""); setSuccess(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      if (mode === "login" || mode === "register") {
        const payload = mode === "login"
          ? { phone: form.phone, password: form.password }
          : { name: form.name, phone: form.phone, password: form.password };
        const data = mode === "login" ? await loginUser(payload) : await registerUser(payload);
        setToken(data.token);
        saveUser({ _id: data._id, name: data.name, phone: data.phone, role: data.role });
        onClose();
        window.location.reload();

      } else if (mode === "forgot") {
        const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setSuccess("OTP sent! Check your phone.");
        switchMode("reset");

      } else if (mode === "reset") {
        const res = await fetch(`${BASE_URL}/auth/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone, otp: form.otp, newPassword: form.newPassword }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setSuccess("Password reset! Please sign in.");
        setTimeout(() => switchMode("login"), 1500);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  const titles = { login: "Sign In", register: "Sign Up", forgot: "Forgot Password", reset: "Reset Password" };

  return (
    <div className={`lp-sidebackdrop ${visible ? "visible" : ""}`} onClick={onClose}>
      <div
        className={`lp-sidecontainer ${visible ? "slide-in" : "slide-out"}`}
        role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lp-logo-wrap">
          <img src={logoPlaceholder} alt="logo" className="lp-logo" />
        </div>

        <h2 className="lp-title">{titles[mode]}</h2>

        {error   && <p style={{ color: "red",    fontSize: "0.85rem", marginBottom: 8 }}>{error}</p>}
        {success && <p style={{ color: "green",  fontSize: "0.85rem", marginBottom: 8 }}>{success}</p>}

        <form className="lp-form" onSubmit={handleSubmit}>

          {/* Register - Name */}
          {mode === "register" && (
            <>
              <label className="lp-label" htmlFor="name">Name</label>
              <input id="name" name="name" className="lp-input" type="text"
                placeholder="Your name" value={form.name} onChange={handleChange} required />
            </>
          )}

          {/* Phone - login, register, forgot, reset */}
          {(mode === "login" || mode === "register" || mode === "forgot" || mode === "reset") && (
            <>
              <label className="lp-label" htmlFor="phone">Mobile Number</label>
              <input id="phone" name="phone" className="lp-input" type="tel" inputMode="numeric"
                placeholder="Enter mobile number" value={form.phone} onChange={handleChange}
                maxLength={15} required />
            </>
          )}

          {/* OTP - reset */}
          {mode === "reset" && (
            <>
              <label className="lp-label" htmlFor="otp">OTP</label>
              <input id="otp" name="otp" className="lp-input" type="text" inputMode="numeric"
                placeholder="Enter 6-digit OTP" value={form.otp} onChange={handleChange}
                maxLength={6} required />
            </>
          )}

          {/* Password - login, register */}
          {(mode === "login" || mode === "register") && (
            <>
              <label className="lp-label" htmlFor="password">Password</label>
              <input id="password" name="password" className="lp-input" type="password"
                placeholder="Enter password" value={form.password} onChange={handleChange} required />
            </>
          )}

          {/* New Password - reset */}
          {mode === "reset" && (
            <>
              <label className="lp-label" htmlFor="newPassword">New Password</label>
              <input id="newPassword" name="newPassword" className="lp-input" type="password"
                placeholder="Enter new password" value={form.newPassword} onChange={handleChange} required />
            </>
          )}

          <button className="lp-cta" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : mode === "forgot" ? "Send OTP" : "Reset Password"}
          </button>
        </form>

        {/* Footer links */}
        {(mode === "login" || mode === "register") && (
          <>
            {mode === "login" && (
              <p style={{ textAlign: "center", marginTop: 8, fontSize: "0.82rem" }}>
                <button style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => switchMode("forgot")}>
                  Forgot Password?
                </button>
              </p>
            )}
            <p style={{ textAlign: "center", marginTop: 8, fontSize: "0.85rem" }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontWeight: 600 }}
                onClick={() => switchMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </>
        )}

        {(mode === "forgot" || mode === "reset") && (
          <p style={{ textAlign: "center", marginTop: 8, fontSize: "0.85rem" }}>
            <button style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontWeight: 600 }}
              onClick={() => switchMode("login")}>
              ← Back to Sign In
            </button>
          </p>
        )}

        <p className="lp-terms">By signing in you agree to our <a href="#">terms and conditions</a></p>
        <button className="lp-close" aria-label="Close" onClick={onClose} title="Close">✕</button>
      </div>
    </div>
  );
}

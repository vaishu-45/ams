import { useState } from "react";
import { getUser, updateProfile } from "../../utils/api.js";

export default function AdminSettings() {
  const user = getUser();
  const [form, setForm] = useState({ name: user?.name || "", password: "", confirm: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      setMsg("Passwords do not match."); return;
    }
    try {
      const body = { name: form.name };
      if (form.password) body.password = form.password;
      await updateProfile(body);
      setMsg("✓ Profile updated!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 20 }}>Settings</h2>

      <div className="adm-card" style={{ maxWidth: 480 }}>
        <p className="adm-card-title">Update Admin Profile</p>
        {msg && <p style={{ color: msg.startsWith("✓") ? "#27ae60" : "#e74c3c", marginBottom: 12, fontSize: "0.85rem" }}>{msg}</p>}
        <form style={{ display: "flex", flexDirection: "column", gap: 14 }} onSubmit={handleSubmit}>
          <div className="adm-field">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="adm-field">
            <label>New Password</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Leave blank to keep current" />
          </div>
          <div className="adm-field">
            <label>Confirm Password</label>
            <input type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
          </div>
          <button type="submit" className="adm-btn adm-btn-primary" style={{ alignSelf: "flex-start" }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

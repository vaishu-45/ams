import { useEffect, useState } from "react";
import { getToken } from "../../utils/api.js";

const BASE = "http://localhost:5000";
const h = () => ({ Authorization: `Bearer ${getToken()}` });

export default function AdminCategories() {
  const [cats, setCats]           = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [name, setName]           = useState("");
  const [image, setImage]         = useState(null);
  const [preview, setPreview]     = useState(null);
  const [msg, setMsg]             = useState("");

  const load = () => fetch(`${BASE}/api/categories`).then(r => r.json()).then(setCats);
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setName(""); setImage(null); setPreview(null); setMsg(""); setShowModal(true); };
  const openEdit = (c) => { setEditing(c); setName(c.name); setImage(null); setPreview(`${BASE}${c.image}`); setMsg(""); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    if (image) fd.append("image", image);

    const url    = editing ? `${BASE}/api/admin/categories/${editing._id}` : `${BASE}/api/admin/categories`;
    const method = editing ? "PUT" : "POST";
    const res    = await fetch(url, { method, headers: h(), body: fd });
    const data   = await res.json();
    if (!res.ok) { setMsg(data.message); return; }
    setMsg(editing ? "✓ Updated!" : "✓ Added!");
    load();
    setTimeout(() => { setShowModal(false); setMsg(""); }, 800);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`${BASE}/api/admin/categories/${id}`, { method: "DELETE", headers: h() });
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Categories ({cats.length})</h2>
        <button className="adm-btn adm-btn-primary" onClick={openAdd}>+ Add Category</button>
      </div>

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead><tr><th>Image</th><th>Name</th><th>Actions</th></tr></thead>
          <tbody>
            {cats.map(c => (
              <tr key={c._id}>
                <td><img src={`${BASE}${c.image}`} alt={c.name} /></td>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button className="adm-btn adm-btn-success adm-btn-sm" onClick={() => openEdit(c)}>Edit</button>
                  <button className="adm-btn adm-btn-danger adm-btn-sm"  onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="adm-modal-bg" onClick={() => setShowModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <p className="adm-modal-title">{editing ? "Edit Category" : "Add Category"}</p>
            {msg && <p style={{ color: msg.startsWith("✓") ? "#27ae60" : "#e74c3c", marginBottom: 12, fontSize: "0.85rem" }}>{msg}</p>}
            <form style={{ display: "flex", flexDirection: "column", gap: 14 }} onSubmit={handleSubmit}>
              <div className="adm-field">
                <label>Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="adm-field">
                <label>Image {editing ? "(leave blank to keep)" : "*"}</label>
                <input type="file" accept="image/*" onChange={e => { setImage(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }} {...(!editing && { required: true })} />
                {preview && <img src={preview} alt="preview" style={{ width: 80, height: 80, objectFit: "contain", marginTop: 6, borderRadius: 8, background: "#f5f5f5" }} />}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button type="button" className="adm-btn" style={{ background: "#f0f0f0", color: "#555" }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">{editing ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

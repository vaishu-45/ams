import { useEffect, useState } from "react";
import { getToken } from "../../utils/api.js";

const BASE = "http://localhost:5000";
const h = () => ({ Authorization: `Bearer ${getToken()}` });

const emptyForm = { name: "", category: "", categoryId: "", weight: "", description: "", price: "", offer: "0", image: null };

export default function AdminProducts() {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal]   = useState(false);
  const [editing, setEditing]       = useState(null); // product being edited
  const [form, setForm]             = useState(emptyForm);
  const [preview, setPreview]       = useState(null);
  const [msg, setMsg]               = useState("");

  const load = () => {
    fetch(`${BASE}/api/admin/products`, { headers: h() }).then(r => r.json()).then(setProducts);
    fetch(`${BASE}/api/categories`).then(r => r.json()).then(setCategories);
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setPreview(null); setMsg(""); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, category: p.category, categoryId: p.categoryId, weight: p.weight, description: p.description, price: p.price, offer: p.offer, image: null });
    setPreview(`${BASE}${p.image}`);
    setMsg("");
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else if (name === "category") {
      const cat = categories.find(c => c.name === value);
      setForm(f => ({ ...f, category: value, categoryId: cat?._id || "" }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null && v !== "") fd.append(k, v); });

    const url    = editing ? `${BASE}/api/admin/products/${editing._id}` : `${BASE}/api/admin/products`;
    const method = editing ? "PUT" : "POST";

    const res  = await fetch(url, { method, headers: h(), body: fd });
    const data = await res.json();
    if (!res.ok) { setMsg(data.message); return; }
    setMsg(editing ? "✓ Product updated!" : "✓ Product added!");
    load();
    setTimeout(() => { setShowModal(false); setMsg(""); }, 800);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${BASE}/api/admin/products/${id}`, { method: "DELETE", headers: h() });
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Products ({products.length})</h2>
        <button className="adm-btn adm-btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Image</th><th>Name</th><th>Category</th><th>Weight</th>
              <th>Price</th><th>Offer</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td><img src={`${BASE}${p.image}`} alt={p.name} /></td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.weight}</td>
                <td>₹{p.price}</td>
                <td>{p.offer > 0 ? <span className="badge badge-green">{p.offer}% OFF</span> : "—"}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button className="adm-btn adm-btn-success adm-btn-sm" onClick={() => openEdit(p)}>Edit</button>
                  <button className="adm-btn adm-btn-danger adm-btn-sm"  onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="adm-modal-bg" onClick={() => setShowModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <p className="adm-modal-title">{editing ? "Edit Product" : "Add New Product"}</p>
            {msg && <p style={{ color: msg.startsWith("✓") ? "#27ae60" : "#e74c3c", marginBottom: 12, fontSize: "0.85rem" }}>{msg}</p>}
            <form className="adm-form" onSubmit={handleSubmit}>
              <div className="adm-field">
                <label>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="adm-field">
                <label>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="adm-field">
                <label>Weight *</label>
                <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 500g" required />
              </div>
              <div className="adm-field">
                <label>Price (₹) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required />
              </div>
              <div className="adm-field">
                <label>Offer (%)</label>
                <input name="offer" type="number" min="0" max="100" value={form.offer} onChange={handleChange} />
              </div>
              <div className="adm-field">
                <label>Image {editing ? "(leave blank to keep current)" : "*"}</label>
                <input name="image" type="file" accept="image/*" onChange={handleChange} {...(!editing && { required: true })} />
                {preview && <img src={preview} alt="preview" style={{ width: 80, height: 80, objectFit: "contain", marginTop: 6, borderRadius: 8, background: "#f5f5f5" }} />}
              </div>
              <div className="adm-field adm-form-full">
                <label>Description *</label>
                <textarea name="description" rows={3} value={form.description} onChange={handleChange} required />
              </div>
              <div className="adm-form-full" style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button type="button" className="adm-btn" style={{ background: "#f0f0f0", color: "#555" }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">{editing ? "Update" : "Add Product"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

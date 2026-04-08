import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";
import { useCart } from "../context/CartContext.jsx";
import { BASE } from "../utils/api.js";

const ProductCards = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState({});

  useEffect(() => {
    fetch(`${BASE}/api/products/top-selling`)
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (product) => {
    addToCart({ ...product, _id: product._id });
    setAdded((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [product._id]: false }));
      navigate("/Cart");
    }, 600);
  };

  return (
    <section className="product-section-wrapper">
      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={`${BASE}${product.image}`} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button
                className={`buy-btn ${added[product._id] ? "added" : ""}`}
                onClick={() => handleAdd(product)}
              >
                {added[product._id] ? "✓ Added!" : "ADD +"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;

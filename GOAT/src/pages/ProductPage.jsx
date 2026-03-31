import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import FAQ from "../components/FAQ";
import { useCart } from "../context/CartContext.jsx";
import "../styles/product.css";

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/category/${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [category]);

  if (products.length === 0) return <p className="loading-text">Loading...</p>;

  const p = products[0];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discountedPrice =
    p.offer > 0 ? p.price - (p.price * p.offer) / 100 : p.price;

  return (
    <div className="product-page">

      {/* ── Main product ── */}
      <div className="main-product-box">
        <div className="product-img-wrap">
          <img src={`http://localhost:5000${p.image}`} alt={p.name} />
        </div>

        <div className="details">
          <h2>{p.name}</h2>
          <p className="weight">{p.weight}</p>
          <p className="desc">{p.description}</p>

          <div className="price-box">
            <h3>₹{discountedPrice}</h3>
            {p.offer > 0 && (
              <>
                <span className="old">₹{p.price}</span>
                <span className="offer">{p.offer}% OFF</span>
              </>
            )}
          </div>

          {/* Quantity selector */}
          <div className="qty-selector">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          <button className={`add-btn ${added ? "added" : ""}`} onClick={handleAdd}>
            {added ? `✓ ${qty} Added!` : "ADD +"}
          </button>
        </div>
      </div>

      {/* ── Related products ── */}
      <RelatedProducts currentProductId={p._id} />

      {/* ── FAQ ── */}
      <FAQ />
    </div>
  );
};

export default ProductPage;

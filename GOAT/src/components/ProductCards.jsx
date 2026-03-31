import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";
import mutton1 from "../assets/mutton1.png";
import mutton2 from "../assets/mutton2.png";
import mutton3 from "../assets/mutton3.png";
import { useCart } from "../context/CartContext.jsx";

const products = [
  { id: 1, name: "Mutton Tenderloin", desc: "Fresh and tender mutton cuts, perfect for curries.", img: mutton1, price: 350 },
  { id: 2, name: "Mutton Chops",      desc: "Juicy mutton chops, cleaned and ready to cook.",    img: mutton2, price: 400 },
  { id: 3, name: "Mutton Keema",      desc: "Freshly minced mutton, ideal for kebabs & biryani.", img: mutton3, price: 320 },
];

const ProductCards = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState({});

  const handleAdd = (product) => {
    // addToCart expects _id, use id as fallback
    addToCart({ ...product, _id: product.id, image: null });
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [product.id]: false }));
      navigate("/Cart");
    }, 600);
  };

  return (
    <section className="product-section-wrapper">
      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <button
                className={`buy-btn ${added[product.id] ? "added" : ""}`}
                onClick={() => handleAdd(product)}
              >
                {added[product.id] ? "✓ Added!" : "ADD +"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;

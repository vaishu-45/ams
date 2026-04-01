import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { BASE } from "../utils/api.js";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation(); // don't trigger parent navigate
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discountedPrice =
    product.offer > 0
      ? product.price - (product.price * product.offer) / 100
      : product.price;

  return (
    <div className="rel-card">
      <div className="rel-img-wrap">
        <img src={`${BASE}${product.image}`} alt={product.name} />
      </div>

      <div className="rel-info">
        <p className="rel-tag">COMFORT PLUS</p>
        <h4 className="rel-name">{product.name}</h4>
        <p className="rel-weight">{product.weight}</p>

        <div className="rel-bottom">
          <div className="rel-price">
            <span className="rel-new">₹{discountedPrice}</span>
            {product.offer > 0 && (
              <span className="rel-old">₹{product.price}</span>
            )}
          </div>
          <button
            className={`rel-add-btn ${added ? "rel-added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓" : "ADD +"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

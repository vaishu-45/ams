import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import AddToCartToast from "../components//AddToCart";

const ProductCard = ({ product }) => {
 const { addToCart } = useContext(CartContext);
const [showToast, setShowToast] = useState(false);

 const handleAddToCart = (e) => {
    console.log("Adding product:", product); 
    e.stopPropagation();
    addToCart(product); 
  
      // ✅ show popup
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
 
  
  };


  return (
    <>
    <div className="product-card">
      <img src={`http://localhost:5000${product.image}`} alt={product.name} />

      <h4>{product.name}</h4>
      <p className="weight">{product.weight}</p>

      <div className="price">
        {product.offer > 0 ? (
          <>
            <span className="new">
              ₹{product.price - (product.price * product.offer) / 100}
            </span>
            <span className="old">₹{product.price}</span>
          </>
        ) : (
          <span className="new">₹{product.price}</span>
        )}
      </div>
      <button className="add-btn" onClick={handleAddToCart}>ADD +</button>
    
    </div>
     {/* ✅ TOAST */}
      <AddToCartToast show={showToast} />

    </>
  );
};

export default ProductCard;

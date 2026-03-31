import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/related.css";

const RelatedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProductId) return;
    fetch(`http://localhost:5000/api/products/random/${currentProductId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="related-products">
      <h3>Related products</h3>
      <div className="related-list">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${encodeURIComponent(product.category)}`)}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

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
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [currentProductId]);

  return (
    <div className="related-products">
      <h3>You may also like</h3>

      <div className="related-list">
        {products.map(product => (
          <div
            key={product._id}
            onClick={() =>
              navigate(`/products/${encodeURIComponent(product.category)}`)
            }
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;



// // #1

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProductCard from "./ProductCard";

// const RelatedProducts = ({ category, currentProductId }) => {
//   const [related, setRelated] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const filtered = data.filter((p) => p._id !== currentProductId);
//         setRelated(filtered.slice(0, 3)); // pick 3 only
//       });
//   }, [category]);

//   return (
//     <div className="related-products">
//       <h3>Related Products</h3>

//       <div className="related-list">
//         {related.map((p) => (
//           <div key={p._id} onClick={() => navigate(`/products/${p._id}`)}>
//             <ProductCard product={p} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;


// #2

// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";

// const RelatedProducts = ({ category }) => {
//   const [related, setRelated] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/related/${category}`)
//       .then((res) => res.json())
//       .then((data) => setRelated(data))
//       .catch((err) => console.log(err));
//   }, [category]);

//   return (
//     <div className="related-section">
//       <h2>Related products</h2>

//       <div className="related-grid">
//         {related.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;

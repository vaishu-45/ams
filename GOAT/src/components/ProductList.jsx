import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

const ProductList = () => {
  const products = [
    { id: 1, image: "/assets/mutton1.png", title: "Mutton Tenderloin" },
    { id: 2, image: "/assets/mutton2.png", title: "Mutton Tenderloin" },
    { id: 3, image: "/assets/mutton3.png", title: "Mutton Tenderloin" },
  ];

  return (
    <section className="product-section">
      <div className="product-grid">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;

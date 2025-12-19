import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useState } from "react";
import AddToCartToast from "../components/AddToCart";
import ProductCard from "../components/ProductCard";
import RelatedProducts from "../components/RelatedProducts";
import FAQ from "../components/FAQ";
import "../styles/product.css";

const ProductPage = ({ product }) => {
  const { category } = useParams();
  // const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  useEffect(() => {
  console.log("Category from URL:", category);

  fetch(`http://localhost:5000/api/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Products from API:", data);
      setProducts(data);
    })
    .catch((err) => console.log(err));
}, [category]);


  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/products/category/${category}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.log(err));
  // }, [category]);

  const [showToast, setShowToast] = useState(false);

  const addToCart = async (product) => {
   try {
    const res = await fetch("http://localhost:5000/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    }),
  });

  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
  }, 2000);

  } catch (error) {
    console.error("Add to cart error:", error);
  }

  // alert("Added to cart");
};

  if (products.length === 0) return <p>Loading...</p>;

  const mainProduct = products[0];

  return (
    <div className="product-page">

      {/* MAIN PRODUCT */}
      <div className="main-product-box">
        <img src={`http://localhost:5000${mainProduct.image}`} alt={mainProduct.name} />

        <div className="details">
          <h2>{mainProduct.name}</h2>
          <p className="weight">{mainProduct.weight}</p>
          <p className="desc">{mainProduct.description}</p>

          <div className="price-box">
            {mainProduct.offer > 0 ? (
              <>
                <h3>
                  ₹{mainProduct.price - (mainProduct.price * mainProduct.offer) / 100}
                </h3>
                <span className="old">₹{mainProduct.price}</span>
                <span className="offer">{mainProduct.offer}% OFF</span>
              </>
            ) : (
              <h3>₹{mainProduct.price}</h3>
            )}
          </div>

          <button className="add-btn" onClick={() => addToCart(mainProduct)}>ADD +</button>
          <AddToCartToast show={showToast} />
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {/* <RelatedProducts category={category} /> */}
      <RelatedProducts currentProductId={mainProduct._id} />

      {/* FAQ SECTION */}
      <FAQ />

    </div>
  );
};

export default ProductPage;

const ProductCard = ({ product }) => {
  return (
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

      <button className="add-btn">ADD +</button>
    </div>
  );
};

export default ProductCard;

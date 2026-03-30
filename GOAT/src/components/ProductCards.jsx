import "../styles/ProductCard.css";
import mutton1 from "../assets/mutton1.png";
import mutton2 from "../assets/mutton2.png";
import mutton3 from "../assets/mutton3.png";

const products = [
  {
    id: 1,
    name: "Mutton Tenderloin",
    desc: "Lorem ipsum dolor sit amet contur adipiscing elit vam us",
    img: mutton1,
  },
  {
    id: 2,
    name: "Mutton Tenderloin",
    desc: "Lorem ipsum dolor sit amet contur adipiscing elit vam us",
    img: mutton2,
  },
  {
    id: 3,
    name: "Mutton Tenderloin",
    desc: "Lorem ipsum dolor sit amet contur adipiscing elit vam us",
    img: mutton3,
  },
];

const ProductCards = () => {
  return (
    <section className="product-section-wrapper">
      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;

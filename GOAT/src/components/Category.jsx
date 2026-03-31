import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="category-section">
      <div className="category_head">
        <h1>Shop by Categories</h1>
        <h2>freshly cut mutton !!</h2>
      </div>

      <div className="category-container">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="category-card"
            onClick={() => navigate(`/products/${cat.name}`)}
          >
            <img
              src={`http://localhost:5000${cat.image}`}
              alt={cat.name}
              className="category-img"
            />
            <h3 className="category-name">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;

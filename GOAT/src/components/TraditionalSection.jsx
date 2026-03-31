import "../styles/TraditionalSection.css";
import mainImg from "../assets/herom.png";
import { useNavigate } from "react-router-dom";

const points = [
  "Established in 1972 in Nagpur, serving the city for over five decades.",
  "Specialising in premium quality, 100% halal goat meat.",
  "Trusted by famous hostels, businesses, and regular customers.",
  "Known for freshness, hygiene, and authentic taste.",
  "Committed to maintaining high standards and customer trust.",
];

const TraditionalSection = () => {
  const navigate = useNavigate();
  return (
    <section className="trad-section">
      <div className="trad-inner">

        {/* Left: text */}
        <div className="trad-text">
          <p className="trad-label">About Adarsh Mutton Shop →</p>
          <h2 className="trad-heading">
            Traditional &amp; Modern<br />Service Since 1972
          </h2>
          <ul className="trad-points">
            {points.map((pt, i) => (
              <li key={i}>
                <span className="trad-dot">🍖</span> {pt}
              </li>
            ))}
          </ul>
          <button className="trad-btn" onClick={() => navigate("/AboutUs")}>Know More</button>
        </div>

        {/* Right: image with dot grid decoration */}
        <div className="trad-img-wrap">
          <div className="trad-dots trad-dots-tl" />
          <img src={mainImg} alt="Fresh mutton cuts" className="trad-img" />
          <div className="trad-dots trad-dots-br" />
        </div>

      </div>
    </section>
  );
};

export default TraditionalSection;

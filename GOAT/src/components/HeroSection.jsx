import React from "react";
import "../styles/HeroSection.css";
import leftImg from "../assets/left-mutton.png";
import rightImg from "../assets/right-mutton.png";
import ToggleText from './ToggleText'

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Left decorative image */}
      <div className="hero-image hero-left">
        <img src={leftImg} alt="Mutton cuts left" />
      </div>

      {/* Main Text Content */}
      <div className="hero-text">
        <h1>
          Fresh Cuts, Rich Taste –<br></br> <em>Mutton</em> at Its Best ....
        </h1>
        <ToggleText />
      </div>

      {/* Right decorative image */}
      <div className="hero-image hero-right">
        <img src={rightImg} alt="Mutton cuts right" />
      </div>
    </section>
    
   
  );
};

export default HeroSection;

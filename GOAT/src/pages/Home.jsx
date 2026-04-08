import React from "react";
import HeroSection from "../components/HeroSection";
import ProductCards from "../components/ProductCards";
import TraditionalSection from "../components/TraditionalSection";
import Category from "../components/Category";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProductCards />       {/* overlaps hero via negative margin-top */}
      <TraditionalSection /> {/* Traditional & Modern section */}
      <Category />           {/* Shop by Categories */}
    </div>
  );
};

export default Home;

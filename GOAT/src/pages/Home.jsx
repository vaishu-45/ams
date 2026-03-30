import React from "react";
// import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import ProductCards from "../components/ProductCards"; // ✅ import your product section
import Category from "../components/Category";

const Home = () => {
  return (
    <div>
      {/* Nav Bar */}
      {/* <NavBar />   */}
      {/* Hero Section */}
      <HeroSection />

      {/* Product Section (below Hero) */}
      <ProductCards />
      <Category />
    </div>
  );
};

export default Home;

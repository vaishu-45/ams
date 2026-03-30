import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import ProductPage from "./pages/ProductPage";
// import Product from './pages/ProductPage';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';

function App() {

  return (
    <>
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/products/:category" element={<ProductPage />} />
          {/* <Route path="/Product" element={<Product />} /> */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </>
  )
}

export default App;

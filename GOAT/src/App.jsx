import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import ProductPage from "./pages/ProductPage";
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';

// Admin
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminCategories from "./admin/pages/AdminCategories";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminCustomers from "./admin/pages/AdminCustomers";
import AdminSettings from "./admin/pages/AdminSettings";

function App() {
  return (
    <Routes>
      {/* ── Admin routes (no NavBar/Footer) ── */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index          element={<Dashboard />} />
        <Route path="orders"     element={<AdminOrders />} />
        <Route path="products"   element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="customers"  element={<AdminCustomers />} />
        <Route path="settings"   element={<AdminSettings />} />
      </Route>

      {/* ── Public routes ── */}
      <Route path="/*" element={
        <div>
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/"                   element={<Home />} />
              <Route path="/Cart"               element={<Cart />} />
              <Route path="/Checkout"           element={<Checkout />} />
              <Route path="/track/:id"          element={<OrderTracking />} />
              <Route path="/products/:category" element={<ProductPage />} />
              <Route path="/Profile"            element={<Profile />} />
              <Route path="/AboutUs"            element={<AboutUs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;

import { FaHeart } from "react-icons/fa";
import "../styles/toast.css";

const AddToCartToast = ({ show }) => {
  if (!show) return null;

  return (
    <div className="cart-toast">
      <FaHeart className="toast-icon" />
      <span>Added to cart</span>
    </div>
  );
};

export default AddToCartToast;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";
import stamp from "../assets/stamp.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showBill, setShowBill] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart");
    const data = await res.json();
    setCartItems(data);
  };

  const updateQty = async (id, qty) => {
    await fetch(`http://localhost:5000/api/cart/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty }),
    });
    fetchCart();
  };

  const removeItem = async (id) => {
    await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
      method: "DELETE",
    });
    fetchCart();
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    
<>

<div className="cart-breadcrumb">
  <span className="link" onClick={() => navigate("/")}>Home</span>
  <span className="separator">/</span>
  <span className="active">Cart</span>
    </div> 
    
    <div className="cart-page">

      {/* CART LIST */}
      {/* <div className="cart-list">
        {cartItems.map(item => (
          <div className="cart-card" key={item._id}>
            <img src={`http://localhost:5000${item.image}`}alt={item.name}/>

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p className="price">₹ {item.price}</p>

              <div className="qty-box">
                <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div> */}

      <div className="cart-list">
       {cartItems.map((item) => (
       <div key={item._id} className="cart-card">
      {/* IMAGE */}
      <img
        className="cart-img"
        src={`http://localhost:5000${item.image}`}
        alt={item.name}
      />

      {/* DETAILS */}
      <div className="cart-details">
        <h4>{item.name}</h4>
        <p className="cart-desc">
          {item.description}
        </p>
        <span className="cart-price">Rs. {item.price} /-</span>
      </div>

      {/* ACTIONS */}
      <div className="cart-actions">
        <div className="qty-box">
          {/* <button onClick={() => updateQty(item._id, item.qty - 1)}> */}
           <button disabled={item.qty === 1} onClick={() => updateQty(item._id, item.qty - 1)} className={item.qty === 1 ? "disabled" : ""}>
            -
          </button>
          <span>{item.qty}</span>
          <button onClick={() => updateQty(item._id, item.qty + 1)}>
            +
          </button>
        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item._id)}
        >
          Remove
        </button>
      </div>
    </div>
  ))}
</div>


      {/* BILL */}
      <div className={`bill-box ${showBill ? "open" : ""}`}>
        <div className="bill-header">
          <h3>Order Summary</h3>
          <img src={stamp} alt="stamp" />
        </div>

         {/* TABLE */}
  <div className="summary-table">
    {/* HEADER */}
    <div className="summary-row header">
      <span>Product</span>
      <span>Qnt</span>
      <span>Price</span>
    </div>

    {/* ROWS */}
    {cartItems.map((item) => (
      <div className="summary-row" key={item._id}>
        <span className="product-name">{item.name}</span>
        <span>{item.qty}</span>
        <span>₹{item.price * item.qty}</span>
      </div>
    ))}
  </div>

     <div className="bill-footer">
        <div className="bill-total">
          <span>Total</span>
          <strong>₹ {totalAmount}</strong>
        </div>

        <button className="checkout-btn">Proceed To Checkout</button>
      </div>
      </div>

      {/* MOBILE TOGGLE */}
      <div className="mobile-bill-btn" onClick={() => setShowBill(!showBill)}>
        📄 Check Order Bill
      </div>
    </div>
  </>

  );
};

export default Cart;


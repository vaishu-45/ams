import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const product = action.payload;

      // 🛡 SAFETY CHECK (prevents black screen)
      if (!product || !product._id) {
        console.error("ADD_TO_CART called with invalid product:", product);
        return state;
      }

      const existing = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === product._id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            qty: 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, qty: Math.max(1, action.payload.qty) }
            : item
        ),
      };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    if (!product) {
      console.error("addToCart called without product");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};



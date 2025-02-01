// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer } from "react";

// Initial state for the cart
const initialState = {
  cartItems: [], // Array of items in the cart
  totalItems: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of items in the cart
};

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If item already exists, increase its quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // If item doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }

    case "REMOVE_FROM_CART":
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice:
          state.totalPrice - itemToRemove.price * itemToRemove.quantity,
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + action.payload.quantity - item.quantity,
        totalPrice:
          state.totalPrice +
          (action.payload.quantity - item.quantity) * item.price,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Create the Cart Context
const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

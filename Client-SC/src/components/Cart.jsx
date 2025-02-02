// src/components/productsClient/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const Cart = () => {
  const { cartItems, totalItems, totalPrice, dispatch } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Handle purchase
  const handlePurchase = async () => {
    try {
      const userId = user.id;
      const products = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
     
      // Send purchase request to the backend
      const response = await axios.post(
        "http://localhost:3000/api/carts/purchase",
        {
          userId,
          products,
        }
      );

      if (response.status === 201) {
        try {
          const response = await axios.post('http://localhost:3000/api/products/create-payment', {
              amount: totalPrice,
          });
          window.location.href = response.data.result.link;
      } catch (error) {
          console.error('Error creating payment:', error);
      }        dispatch({ type: "CLEAR_CART" }); // Clear the cart after purchase
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Failed to complete purchase");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">${item.price}</Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item })
                    }
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h6">Total Items: {totalItems}</Typography>
            <Typography variant="h6">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchase} // Trigger purchase
            >
              Purchase
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              sx={{ ml: 2 }}
            >
              Clear Cart
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;

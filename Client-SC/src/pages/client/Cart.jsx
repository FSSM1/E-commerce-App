/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button, Grid, CircularProgress, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";


// eslint-disable-next-line react/prop-types
const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }
  
    const fetchCartItems = async () => {
      try {
        console.log("Fetching cart for userId:", userId);  
        const response = await axios.get(`http://localhost:3000/api/carts/getAll/${userId}`);
        setCartItems(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartItems();
  }, [userId]);
  

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://localhost:3000/api/carts/update/${id}`, { quantity });
      setCartItems(cartItems.map(item => (item.id === id ? { ...item, quantity } : item)));
    } catch (err) {
      setError("Failed to update quantity.");
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/carts/delete/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (cartItems.length === 0) return <Typography>Your cart is empty.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography variant="body2">Price: ${item.product.price.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">Total: ${(item.product.price * item.quantity).toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeItem(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cart;

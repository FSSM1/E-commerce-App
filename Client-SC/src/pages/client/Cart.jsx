import  { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TextField,
  CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      setError("Please login to view your cart");
      setLoading(false);
      navigate('/client/login');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/carts/getAll/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCartItems(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, navigate]);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `http://localhost:3000/api/carts/update/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/carts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (cartItems.length === 0) return <Typography>Your cart is empty.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant="h6">{item.product.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  ${item.product.price.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    inputProps={{ min: 1 }}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => removeItem(item.id)} 
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cart;
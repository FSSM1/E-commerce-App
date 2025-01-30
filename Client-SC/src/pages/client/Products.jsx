/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";

function Allproduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/getAll");
        setProducts(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/products/add", productData);
      console.log("Product added:", response.data);
      setProducts([...products, response.data.data]);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/cart/add", { productId });
      console.log("Product added to cart:", productId);
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  };

  if (error) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: "center" }}>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {(loading ? Array.from(new Array(6)) : products).map((product, index) => (
          <Grid item key={product?.id || index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              {loading ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              )}
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton height={32} />
                    <Skeleton width="60%" />
                  </>
                ) : (
                  <>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                  </>
                )}
              </CardContent>
              <CardActions>
                {loading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <>
                    <Button component={Link} to={`/products/get/${product.id}`} variant="outlined">
                      Details
                    </Button>
                    <Button variant="contained" onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Allproduct;

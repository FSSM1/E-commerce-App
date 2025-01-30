/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Skeleton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';

function Allproduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {  
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, background: 'linear-gradient(to bottom, #fff5f5, #ffe5e5)' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold',
        mb: 4,
        textAlign: 'center',
        background: 'linear-gradient(45deg, #ff0000, #ff5252)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '1.5px'
      }}>
        Our Products
      </Typography>
      
      <Grid container spacing={4}>
        {(loading ? Array.from(new Array(6)) : products).map((product, index) => (
          <Grid item key={product?.id || index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out',
              border: '1px solid #ffebee',
              '&:hover': { 
                transform: !loading ? 'translateY(-5px)' : 'none',
                boxShadow: '0 4px 20px rgba(255, 82, 82, 0.2)',
                borderColor: '#ff5252'
              }
            }}>
              {loading ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: '2px solid #ffebee'
                  }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1, py: 2 }}>
                {loading ? (
                  <>
                    <Skeleton height={32} />
                    <Skeleton width="60%" />
                  </>
                ) : (
                  <>
                    <Typography gutterBottom variant="h6" component="h2" sx={{ 
                      color: '#d32f2f', 
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {product.name}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: '#b71c1c',
                      fontWeight: 700
                    }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </>
                )}
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                {loading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <>
                    <Button 
                      component={Link}
                      to={`/products/${product.id}`}
                      variant="outlined" 
                      sx={{
                        color: '#d32f2f',
                        borderColor: '#d32f2f',
                        '&:hover': {
                          borderColor: '#b71c1c',
                          backgroundColor: 'rgba(211, 47, 47, 0.04)'
                        }
                      }}
                    >
                      Details
                    </Button>
                    <Button 
                      variant="contained" 
                      sx={{
                        ml: 1,
                        background: 'linear-gradient(45deg, #d32f2f 30%, #b71c1c 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!loading && products.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4, color: '#d32f2f' }}>
          No products found
        </Typography>
      )}
    </Container>
  );
}

export default Allproduct;
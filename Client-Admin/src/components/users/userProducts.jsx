import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Button, TextField } from '@mui/material';


const Products = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For search results
 
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const user = JSON.parse(localStorage.getItem("user"));


  // Fetch all products
  const fetchproductuser = async () => {
    try {
      const products = await axios.get("http://127.0.0.1:3000/api/products/getAll");
      console.log("Fetched products:", products.data.data);
      setData(products.data.data);
      setFilteredData(products.data.data); // Initialize filtered data with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    const filtered = data.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
       {/* Search Bar */}
       <Box sx={{ display: "flex", justifyContent: "flex-end " , marginRight: 5 }}>
  <TextField
    fullWidth
    label="Search Products"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    sx={{ mb: 3, width: '25%' }}
  />
</Box>

      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
           
          <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {data.map((el) => (
          <Grid item key={el.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
              {/* CardMedia with fixed height and object-fit */}
              <CardMedia
                component="img"
                alt={el.name}
                height="200" // Fixed height for all images
                image={el.image}
                sx={{
                  width: '100%', // Ensure the image takes full width of the card
                  objectFit: 'cover', // Ensures the image covers the area without distortion
                  aspectRatio: '1/1', // Enforce a consistent aspect ratio (e.g., 16:9)
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {el.name}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${el.price}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {el.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {handleDelete(el.id)}}
                >
                  Delete
                </Button>
                <Button variant="contained" color="primary" size="small" onClick={()=>{handleEdit(el)}}>
                  Update
                </Button>
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
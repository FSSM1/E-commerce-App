import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Button } from '@mui/material';
import Allproduct from '../../components/productsClient/Allproduct';
const Products = () => {
  
  const [data, setData] = useState([]);
  const fetchproduct = async () => {
    try {
      const products = await axios.get("http://127.0.0.1:3000/api/products/getAll");
      console.log("Fetched products:", products.data.data);
      setData(products.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);
   
  return (
    <div>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "flex-start", justifyContent: "left" }}>
         
        </Grid>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
              <Allproduct data={data}/>
            
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
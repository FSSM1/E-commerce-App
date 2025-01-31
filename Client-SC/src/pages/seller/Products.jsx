import React from 'react'
import { useState,useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import AddProduct from "../../components/productsSeller/AddProduct"
import EditProduct from "../../components/productsSeller/EditProduct"
import Allproduct from "../../components/productsSeller/Allproduct"
import axios from 'axios';
function Products() {
console.log("helooooooooooooo saif");
const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
const [product, setProducts] = useState([]);

const user = JSON.parse(localStorage.getItem("user"));
// console.log(user,"hamadiiiiiiii");

  const fetchproduct = async (id) => {
    if(user.role == "seller"){
      try {
        const products = await axios.get(`http://127.0.0.1:3000/api/products/productseller/${user.id}`);
        console.log("Fetched products:", products.data.data);
        setProducts(products.data.data);
      }
      catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    
  };
  useEffect(() => {
    
    fetchproduct()
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/products/delete/${id}`);
      fetchproduct(); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleEdit = (product) => {
    setSelectedProduct(product); 
    setShowAddProduct(false); 
  };

  
  const handleSave = async (productData) => {
    try {
      productData.userId = user.id;
      await axios.post(`http://127.0.0.1:3000/api/products/add`, productData);
      console.log("prod00000  ",productData.image);
      fetchproduct(); 
      setShowAddProduct(false); 
      setSelectedProduct(null); 
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div>
      <div>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "flex-start", justifyContent: "left" }}>
          <Box sx={{ marginBottom: "20px" }}>
            <Button variant="text" color="primary" size="large" onClick={() => setShowAddProduct(false)} sx={{ marginRight: "10px" }}>
             {user?.firstname} product 
            </Button>
            <br />
            <Button variant="text" color="secondary" size="large" onClick={() => setShowAddProduct(true)}>
              Add Product
            </Button>
          </Box>
        </Grid>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {showAddProduct ? (
              <AddProduct  handleSave={handleSave} setShowAddProduct={setShowAddProduct}/>
            ) : selectedProduct ? (
              <EditProduct
               product={selectedProduct}
                handleSave={handleSave}
              setSelectedProduct={setSelectedProduct}
                 />

            )
            : (
              <Allproduct product={product} handleDelete={handleDelete} handleEdit={handleEdit}  handleSave={handleSave}/>
            )}
            
          </Box>
        </Grid>
      </Grid>
    </div>
      
    </div>
  )
}

export default Products
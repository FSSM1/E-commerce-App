import React from 'react'
import { useState,useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import AddProduct from "../../components/productsSeller/AddProduct"
import EditProduct from "../../components/productsSeller/EditProduct"
import Allproduct from "../../components/productsSeller/Allproduct"
import axios from 'axios';
function Products() {

const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
const [product, setProducts] = useState([]);
const [categories, setCategories] = useState([]);


const getAllCategories = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/categories/getAll");
    console.log(response.data.data);
    setCategories(response.data.data);
  } catch (error) {
    throw error;
  }
};
const user = JSON.parse(localStorage.getItem("user"));


  const fetchproduct = async (id) => {
    if(user.role == "seller"||user.role == "admin"){
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
    getAllCategories()
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
  const handleEdit = async(product) => {
    setSelectedProduct(product); 
    setShowAddProduct(false); 
  };

  
  const handleSave = async (productData) => {
    try {
      if (productData.id) {
        // If there's an ID, we're updating an existing user
        await axios.put(`http://127.0.0.1:3000/api/products/update/${productData.id}`, productData);
      } else {
        // Otherwise, we're creating a new user
        await axios.post(`http://127.0.0.1:3000/api/products/add`, productData);
      }
      fetchproduct(); // Refresh the list
      setShowAddProduct(false); // Hide the form
      setSelectedProduct(null); // Clear selected user after saving
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
              <AddProduct categories={categories} handleSave={handleSave} setShowAddProduct={setShowAddProduct}/>
            ) : selectedProduct ? (
              <EditProduct
              categories={categories}
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
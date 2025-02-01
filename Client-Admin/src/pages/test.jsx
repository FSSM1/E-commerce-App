import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Button } from '@mui/material';
import ProductList from '../components/products/ProductList.jsx';
import AddProduct from '../components/products/AddProduct.jsx';
import EditProduct from '../components/products/EditProduct.jsx';
const Products = () => {
  const [data, setData] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categories, setCategories] = useState([]);
  console.log(categories,"dddddddddddddddddddd");
  



  const getAllCategories = async () => {
  try {
    const response= await axios.get("http://127.0.0.1:3000/api/categories/getAll")
    console.log(response.data.data);
    setCategories(response.data.data);
    
  } catch (error) {
    throw error;
  }
  };
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
    getAllCategories()
  }, []);




  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/products/delete/${id}`);
      fetchproduct(); // Re-fetch the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

   const handleEdit = (product) => {
    setSelectedProduct(product); // Set the user to edit
    setShowAddProduct(false); // Ensure we hide the "Add User" form
  };

  // Save the user (for Add or Edit)
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
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "flex-start", justifyContent: "left" }}>
          <Box sx={{ marginBottom: "20px" }}>
            <Button variant="text" color="primary" size="large" onClick={() => setShowAddProduct(false)} sx={{ marginRight: "10px" }}>
              Product List
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
              <AddProduct  categories={categories} handleSave={handleSave} setShowAddProduct={setShowAddProduct} />
            ) : selectedProduct ? (
              <EditProduct
                product={selectedProduct}
                handleSave={handleSave}
              setSelectedProduct={setSelectedProduct} />

            )
            : (
              <ProductList data={data} handleDelete={handleDelete} handleEdit={handleEdit}/>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
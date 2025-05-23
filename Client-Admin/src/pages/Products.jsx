import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Button, TextField } from '@mui/material';
import ProductList from '../components/products/ProductList.jsx';
import AddProduct from '../components/products/AddProduct.jsx';
import EditProduct from '../components/products/EditProduct.jsx';
import { toast } from 'react-toastify';

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For search results
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const user = JSON.parse(localStorage.getItem("user"));


  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/categories/getAll");
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  const fetchproduct = async () => {
    try {
      console.log(user.role,"roole")
      if(user.role=="admin"){

        
      const products = await axios.get("http://127.0.0.1:3000/api/admin/getAll");
      console.log("Fetched products:", products.data.data);
      setData(products.data.data);
      setFilteredData(products.data.data); }// Initialize filtered data with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    if(user.role=="admin"){

    try {
      await axios.delete(`http://127.0.0.1:3000/api/admin/delete/${id}`,{
        headers: {
          'user-id': user.id, // Send the logged-in user's ID in the headers
        },
      });
      toast.success("deleted successfully ")
      fetchproduct(); // Re-fetch the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }}
  };

  // Handle product edit
  const handleEdit = (product) => {
    setSelectedProduct(product); // Set the product to edit
    setShowAddProduct(false); 
  };

  // Save the product (for Add or Edit)
  const handleSave = async (productData) => {
    if(user.role=="admin"){

    try {
      if (productData.id) {
        await axios.put(`http://127.0.0.1:3000/api/admin/update/${productData.id}`, productData,{
          headers: {
            'user-id': user.id, 
          },
        });
      } else {
        await axios.post(`http://127.0.0.1:3000/api/admin/add`, productData,{
          headers: {
            'user-id': user.id, 
          },
        });
      }
      fetchproduct(); 
      setShowAddProduct(false); 
      setSelectedProduct(null); 
    
  } catch (error) {
      console.error("Error saving product:", error);
    }}
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
    fetchproduct();
    getAllCategories();
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
              <AddProduct categories={categories} handleSave={handleSave} setShowAddProduct={setShowAddProduct} />
            ) : selectedProduct ? (
              <EditProduct
              categories={categories}
                product={selectedProduct}
                handleSave={handleSave}
                setSelectedProduct={setSelectedProduct}
              />
            ) : (
              <ProductList data={filteredData} handleDelete={handleDelete} handleEdit={handleEdit} />
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
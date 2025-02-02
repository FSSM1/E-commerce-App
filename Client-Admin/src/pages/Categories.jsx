import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Button, TextField } from '@mui/material';
import CategoriesList from '../components/categories/CategoriesList.jsx';
import AddCategories from '../components/categories/AddCategories.jsx';
import Editcategories from '../components/categories/EditCategories.jsx';

const Categories = () => {
  
  const [filteredData, setFilteredData] = useState([]); // For search results
  const [showAddcategorie, setShowAddcategorie] = useState(false);
  const [selectedcategorie, setSelectedcategorie] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  console.log(categories, "dddddddddddddddddddd");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/categories/getAll");
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      throw error;
    }
  };


 

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/categories/delete/${id}`);
      fetchCategories(); // Re-fetch the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle product edit
  const handleEdit = (categorie) => {
    setSelectedcategorie(categorie); // Set the product to edit
    setShowAddcategorie(false); 
  };

  // Save the product (for Add or Edit)
  const handleSave = async (categorieData) => {
    try {
      if (categorieData.id) {
        // If there's an ID, we're updating an existing categorie
        await axios.put(`http://127.0.0.1:3000/api/categories/update/${categorieData.id}`, categorieData);
      } else {
        // Otherwise, we're creating a new categorie
        await axios.post(`http://127.0.0.1:3000/api/categories/add`, categorieData);
      }
      fetchCategories(); // Refresh the list
      setShowAddcategorie(false); // Hide the form
      setSelectedcategorie(null); // Clear selected product after saving 
    
  } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    const filtered = categories.filter((categororie) =>
      categororie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchCategories();

  }, []);

  return (
    <div>
       {/* Search Bar */}
       <Box sx={{ display: "flex", justifyContent: "flex-end " , marginRight: 5 }}>
  <TextField
    fullWidth
    label="Search Categories"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    sx={{ mb: 3, width: '25%' }}
  />
</Box>

      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "flex-start", justifyContent: "left" }}>
          <Box sx={{ marginBottom: "20px" }}>
            <Button variant="text" color="primary" size="large" onClick={() => setShowAddcategorie(false)} sx={{ marginRight: "10px" }}>
              Categorie List
            </Button>
            <br />
            <Button variant="text" color="secondary" size="large" onClick={() => setShowAddcategorie(true)}>
              Add Categorie
            </Button>
          </Box>
        </Grid>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
           
            {showAddcategorie ? (
              <AddCategories  handleSave={handleSave} setShowAddcategorie={setShowAddcategorie} />
            ) : selectedcategorie ? (
              <Editcategories
             
              categorie={selectedcategorie}
                handleSave={handleSave}
                setSelectedcategorie={setSelectedcategorie}
              />
            ) : (
              <CategoriesList categories={categories} handleDelete={handleDelete} handleEdit={handleEdit} />
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
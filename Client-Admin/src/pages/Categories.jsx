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
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/categories/getAll");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      if (user && user.role === "admin") {
        await axios.delete(`http://127.0.0.1:3000/api/categories/delete/${id}`,{headers: {
          'user-id': user.id, // Send the logged-in user's ID in the headers
        },
      });
        fetchCategories(); // Re-fetch the category list after deletion
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle category edit
  const handleEdit = (categorie) => {
    setSelectedcategorie(categorie); // Set the category to edit
    setShowAddcategorie(false); // Hide the Add form
  };

  // Save the category (for Add or Edit)
  const handleSave = async (categorieData) => {
    try {
      if (user && user.role === "admin") {
        if (categorieData.id) {
          // Update existing category
          await axios.put(`http://127.0.0.1:3000/api/categories/update/${categorieData.id}`, categorieData,{headers: {
            'user-id': user.id, // Send the logged-in user's ID in the headers
          },
        });
        } else {
          // Add new category
          await axios.post(`http://127.0.0.1:3000/api/categories/add`, categorieData);
        }
        fetchCategories(); // Refresh the list
        setShowAddcategorie(false); // Hide the form
        setSelectedcategorie(null); // Clear selected category after saving
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter categories based on the search query
    const filtered = categories.filter((categorie) =>
      categorie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: 5 }}>
        <TextField
          fullWidth
          label="Search Categories"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3, width: '25%' }}
        />
      </Box>

      <Grid container sx={{ minHeight: "100vh" }}>
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
              <AddCategories handleSave={handleSave} setShowAddcategorie={setShowAddcategorie} />
            ) : selectedcategorie ? (
              <Editcategories
                categorie={selectedcategorie}
                handleSave={handleSave}
                setSelectedcategorie={setSelectedcategorie}
              />
            ) : (
              <CategoriesList
                categories={searchQuery ? filteredData : categories}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
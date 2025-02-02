import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddCategories = ({ handleSave, setShowAddcategorie }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData); // Pass the form data to the parent component
    setFormData({ name: "" }); // Reset the form after submission
    setShowAddcategorie(false); // Hide the add form
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Categories
      </Typography>
      <TextField
        fullWidth
        label="Category Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </Box>
  );
};

export default AddCategories;

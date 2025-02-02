import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios"; // Import axios for file upload

const AddProduct = ({ categories, handleSave, setShowAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    nbSold: "",
    categoryId: "",
  });

  useEffect(() => {
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: "",
      nbSold: "",
      categoryId: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Assuming the response contains the URL of the uploaded image
      setFormData({
        ...formData,
        image: response.data.file.path, // Adjust to the correct field from the response
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    setShowAddProduct(false);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
          className="py-2"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
          className="py-2"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
          className="py-2"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          margin="normal"
          required
          className="py-2"
        />

        {/* File Input for Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-4 p-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {formData.image && (
          <Typography sx={{ mt: 1, color: "green" }} className="text-sm">
            Image uploaded successfully!
          </Typography>
        )}

        <TextField
          fullWidth
          label="Number Sold"
          name="nbSold"
          type="number"
          value={formData.nbSold}
          onChange={handleChange}
          margin="normal"
          required
          className="py-2"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            label="Category"
            className="py-2"
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.id}
                defaultValue="phone"
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          className="w-full"
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;

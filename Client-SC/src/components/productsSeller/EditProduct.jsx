import React, { useState } from "react";
import {toast} from "react-toastify"
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
import axios from "axios";

const EditProduct = ({ categories, product, handleSave, setSelectedProduct }) => {
  const [formData, setFormData] = useState(product);
  const [newImage, setNewImage] = useState(null); // Track new image selection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewImage(URL.createObjectURL(file)); // Show preview of new image

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/api/upload/${product.image.split("/").pop()}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("imaged updated")

      setFormData((prev) => ({ ...prev, image: response.data.file.path })); // Update image URL
    } catch (error) {
      console.error("Image update failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSave(formData);
    toast.success("submitted ")
  };

  return (
    <Box className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Typography variant="h4" className="text-gray-800 font-semibold mb-6">
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="p-2"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          className="p-2"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="p-2"
        />

        {/* ✅ Styled File Input for Image Upload */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-4">
          {newImage ? (
            <img src={newImage} alt="Preview" className="mx-auto mb-2 w-32 h-32 object-cover rounded-lg shadow-md" />
          ) : (
            <img src={formData.image} alt="Current" className="mx-auto mb-2 w-32 h-32 object-cover rounded-lg shadow-md" />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <p className="text-gray-600 text-sm">Click to upload a new image</p>
        </div>

        <TextField
          fullWidth
          label="Number Sold"
          name="nbSold"
          type="number"
          value={formData.nbSold}
          onChange={handleChange}
          required
          className="p-2"
        />

        <FormControl fullWidth required className="p-2">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId || ""}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" className="w-full mt-6">
          Save Changes
        </Button>
        <Button variant="outlined" className="w-full mt-3 border-gray-400 text-gray-600" onClick={() => setSelectedProduct(null)}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;

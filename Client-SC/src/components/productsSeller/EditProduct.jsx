import React, { useState } from 'react'
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
const EditProduct = ({categories,product,handleSave,setSelectedProduct}) => {
  const [formData, setFormData] = useState(product)
  const handleChange = (e) => {
    const{name,value}=e.target
    setFormData({...formData, [name]:value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave(formData)
  }
  return (
    
     <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Product
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
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
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
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Number Sold"
          name="nbSold"
          type="number"
          value={formData.nbSold}
          onChange={handleChange}
          margin="normal"
          required
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
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
         <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: "gray", color: "gray", marginTop: "10px" }}
        fullWidth
        onClick={() => setSelectedProduct(null)}
      >
        Cancel
      </Button>
      </form>
    </Box> 
  
  );
};

export default EditProduct;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

const AddUser = ({ user, onSave, setShowAddUser }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    role: "admin",
  });

  // Update form data when the `user` prop changes (for editing)
  useEffect(() => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      role: "admin",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass form data to the parent component
    setShowAddUser(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add User
      </Typography>
      <TextField
        fullWidth
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Select
        fullWidth
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        margin="dense"
        required
        sx={{ mt: 2, mb: 2 }}
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="Client">Client</MenuItem>
        <MenuItem value="Seller">Seller</MenuItem>
      </Select>
      <Button type="submit" variant="contained" color="primary">
        Add User
      </Button>
    </Box>
  );
};

export default AddUser;

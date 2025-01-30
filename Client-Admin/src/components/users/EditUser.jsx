import React, { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";

const EditUser = ({ user, onSave, setSelectedUser }) => {
  const [formData, setFormData] = useState(user);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call onSave with the updated user data
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "400px" }}>
      <TextField
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
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
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="seller">Seller</MenuItem>
      </Select>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: "gray", color: "gray", marginTop: "10px" }}
        fullWidth
        onClick={() => setSelectedUser(null)}
      >
        Cancel
      </Button>
    </form>
  );
};

export default EditUser;

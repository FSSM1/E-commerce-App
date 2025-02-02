import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Placeholder functions for form submission
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:3000/api/users/update/${user.id}`, {
      password: newPassword,
    });
    toast.success("password successfully ")
    alert("Password updated successfully!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
        }}
      >
        {/* Update Password Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          Update Password
        </Typography>
        <form onSubmit={handleUpdatePassword}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Display error message if passwords don't match */}
          {passwordError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {passwordError}
            </Typography>
          )}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings;

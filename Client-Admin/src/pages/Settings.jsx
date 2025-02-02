import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Function to handle password update
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Clear any previous error
    setPasswordError("");

    // Make the API call to update the password
    axios
      .put(`http://127.0.0.1:3000/api/users/update/${user.id}`, {
        password: newPassword,
      })
      .then(() => {
        alert("Password updated successfully!");
        setNewPassword(""); // Clear the password fields
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password");
      });
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

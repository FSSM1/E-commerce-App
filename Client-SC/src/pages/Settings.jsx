import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import axios from "axios";

const Settings = () => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userFirstName = user?.firstName || "First Name";
  const userLastName = user?.lastName || "Last Name";
  const userEmail = user?.email || "Email";
  const userAddress = user?.address || "Address";

  // Function to handle profile update
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:3000/api/users/update/${user.id}`, {
        firstName,
        lastName,
        email,
        address,
      })
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      });
  };

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
          maxWidth: 600,
          width: "100%",
        }}
      >
        {/* Update Profile Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Update Profile
        </Typography>
        <form onSubmit={handleUpdateProfile}>
          <Grid container spacing={2}>
            {/* First Name and Last Name */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                placeholder={userFirstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                placeholder={userLastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
              />
            </Grid>

            {/* Email and Address */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                placeholder={userEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address"
                placeholder={userAddress}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </form>

        {/* Update Password Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          Password Changes
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

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";

const Settings = () => {
  const [newEmail, SetNewEmail] = useState("");
  const [newPassword, SetNewPassword] = useState("");

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const userEmail = user?.email || "No email provided";

  // Placeholder functions for form submission
  const handleUpdateEmail = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:3000/api/users/update/${user.id}`, {
      email: newEmail,
    });
    alert("Email updated successfully!");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:3000/api/users/update/${user.id}`, {
      password: newPassword,
    });
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
        {/* Update Email Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Update Email
        </Typography>
        <form onSubmit={handleUpdateEmail}>
          <TextField
            fullWidth
            label="Current Email"
            value={userEmail}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="New Email"
            type="email"
            margin="normal"
            onChange={(e) => SetNewEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Email
          </Button>
        </form>

        {/* Update Password Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          Update Password
        </Typography>
        <form onSubmit={handleUpdatePassword}>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            onChange={(e) => SetNewPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            margin="normal"
            onChange={(e) => SetNewPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings;

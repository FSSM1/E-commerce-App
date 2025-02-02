import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Profile = () => {
  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const firstname = user?.firstname || "";
  const lastname = user?.lastname || "";
  const userName = firstname + " " + lastname;
  const userEmail = user?.email || "No email provided";
  const userRole = user?.role || "No role assigned";

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
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            width: 80,
            height: 80,
            fontSize: "2.5rem",
            mb: 2,
            mx: "auto",
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </Avatar>

        {/* User Info */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {userName}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {userEmail}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Role: {userRole}
        </Typography>

        {/* Additional Info (Optional) */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {/* You can add more profile details here, such as address, phone
            number, etc. */}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;

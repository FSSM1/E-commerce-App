import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown anchor
  const open = Boolean(anchorEl);

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const firstname = user?.firstname || "";
  const lastname = user?.lastname || "";
  const userName = firstname + " " + lastname;
  const userEmail = user?.email || "No email provided";
  const userRole = user?.role || "No role assigned";

  // Handle dropdown open
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    window.location.href = "/login"; // Redirect to home
  };

  const handleProfile = () => {
    window.location.href = "/profile"; // Redirect to profile
  };

  const handleSettings = () => {
    const role = userRole;
    window.location.href = "/settings"; // Redirect to settings
  };

  return (
    <div>
      {!user ? (
        <div></div>
      ) : (
        <Box>
          {/* Avatar Button */}
          <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                width: 40,
                height: 40,
                fontSize: "1.2rem",
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 250,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* User Info Section */}
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userEmail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {userRole}
              </Typography>
            </Box>
            <Divider />

            {/* Menu Items */}
            <MenuItem onClick={handleProfile}>
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleSettings}>
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Typography variant="body2" color="error">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </div>
  );
};

export default ProfileDropdown;

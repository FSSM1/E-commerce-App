import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/users/UserList";
import AddUser from "../components/users/AddUser";
import { Grid, Box, Button } from "@mui/material";
import EditUser from "../components/users/EditUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false); // State to toggle between components
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user to edit

  const API_URL = "http://localhost:3000/api/users";

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAll`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL}/delete/${userId}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit a user
  const handleEdit = (user) => {
    setSelectedUser(user); // Set the user to edit
    setShowAddUser(false); // Ensure we hide the "Add User" form
  };

  // Save the user (for Add or Edit)
  const handleSave = async (userData) => {
    try {
      if (userData.id) {
        // If there's an ID, we're updating an existing user
        await axios.put(`${API_URL}/update/${userData.id}`, userData);
      } else {
        // Otherwise, we're creating a new user
        await axios.post(`${API_URL}/add`, userData);
      }
      fetchUsers(); // Refresh the list
      setShowAddUser(false); // Hide the form
      setSelectedUser(null); // Clear selected user after saving
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Grid container sx={{ height: "100vh" }}>
        {/* Left Vertical Section */}
        <Grid
          item
          xs={2}
          sx={{
            bgcolor: "#f5f5f5",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
          }}
        >
          {/* Navigation Buttons */}
          <Box sx={{ marginBottom: "20px" }}>
            <Button
              variant="text"
              color="primary"
              size="large"
              onClick={() => setShowAddUser(false)}
              sx={{ marginRight: "10px" }}
            >
              User List
            </Button>
            <br />
            <Button
              variant="text"
              color="secondary"
              size="large"
              onClick={() => setShowAddUser(true)}
            >
              Add User
            </Button>
          </Box>
        </Grid>

        {/* Right Horizontal Section */}
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Conditional Rendering */}
            {showAddUser ? (
              <AddUser onSave={handleSave} setShowAddUser={setShowAddUser} />
            ) : selectedUser ? (
              <EditUser
                user={selectedUser}
                onSave={handleSave}
                setSelectedUser={setSelectedUser}
              />
            ) : (
              <UserList
                users={users}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Users;

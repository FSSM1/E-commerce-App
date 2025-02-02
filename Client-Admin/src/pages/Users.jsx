import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/users/UserList";
import AddUser from "../components/users/AddUser";
import EditUser from "../components/users/EditUser";
import { Grid, Box, Button, TextField } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const API_URL = "http://localhost:3000/api/users";

  // Fetch all users
  const fetchUsers = async () => {
    if(user.role=="admin"){

    try {
      const response = await axios.get(`${API_URL}/getAll`);
      setUsers(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (userId) => {
    if(user.role=="admin"){
    try {
      await axios.delete(`${API_URL}/delete/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }}
  };

  // Edit a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowAddUser(false);
  };

  // Save the user (for Add or Edit)
  const handleSave = async (userData) => {
    if(user.role=="admin"){
    try {
      if (userData.id) {
        await axios.put(`${API_URL}/update/${userData.id}`, userData);
      } else {
        await axios.post(`${API_URL}/add`, userData);
      }
      fetchUsers();
      setShowAddUser(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }}
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      
      user.firstname.toLowerCase().includes(query.toLowerCase()) ||
      user.lastname.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
        <TextField
          label="Search users"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3, width: "25%" }}
        />
      </Box>

      <Grid container sx={{ height: "100vh" }}>
        {/* Sidebar Navigation */}
        <Grid
          item
          xs={2}
          sx={{
            bgcolor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: 2,
          }}
        >
          <Button variant="text" color="primary" onClick={() => setShowAddUser(false)}>
            User List
          </Button>
          <Button variant="text" color="secondary" onClick={() => setShowAddUser(true)}>
            Add User
          </Button>
        </Grid>

        {/* Main Content */}
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
            {showAddUser ? (
              <AddUser onSave={handleSave} setShowAddUser={setShowAddUser} />
            ) : selectedUser ? (
              <EditUser user={selectedUser} onSave={handleSave} setSelectedUser={setSelectedUser} />
            ) : (
              <UserList users={filteredData} onDelete={handleDelete} onEdit={handleEdit} />
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Users;

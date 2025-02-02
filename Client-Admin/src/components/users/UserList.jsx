import React, { useState } from "react";
import UserProducts from "./UserProducts"


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserList = ({ users, onDelete, onEdit, onGetProducts }) => {
  const navigate=useNavigate()


  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </Button>
                {(user.role === "admin") && (
                  <Button
                    variant="contained"
                    color="secondary"
                   onClick={() => navigate(`/user-products/${user.id}`)}
                  >
                    Get Products
                  </Button>
                  
                )}
     

              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
};

export default UserList;
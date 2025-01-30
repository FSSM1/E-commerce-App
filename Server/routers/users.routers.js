const express = require("express");
const {
  getAllUsers,
  getOneUser,
  addOneUser,
  deleteOneUser,
  updateOneUser,
  login,
  signup,
  refreshToken,
  verifyToken,
  authenticateToken
} = require("../controllers/users.controllers");

const Router = express.Router();

Router.get("/getAll", getAllUsers);
Router.get("/get/:userId", getOneUser);
Router.post("/add", addOneUser);
Router.delete("/delete/:userId", deleteOneUser);
Router.put("/update/:userId", updateOneUser);
Router.post("/login", login);
Router.post("/signup", signup);
Router.post("/refresh", refreshToken); // New route for refresh token
Router.get("/verify",authenticateToken,verifyToken )

module.exports = Router;

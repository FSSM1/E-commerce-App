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
  authenticateToken,
  sendResetPasswordEmail,
  forgotPassword,
  verifyResetToken,
  resetPassword
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
Router.post("/reset-password", resetPassword);
Router.post("/forgot-password", forgotPassword);
Router.get("/verify-reset-token", verifyResetToken);


module.exports = Router;

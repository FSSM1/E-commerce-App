const express = require("express");
const {
  getAllUsers,
  getOneUser,
  addOneUser,
  deleteOneUser,
  updateOneUser,
} = require("../controllers/users.controllers");
const Router = express.Router();

Router.get("/getAll", getAllUsers);
Router.get("/get/:userId", getOneUser);
Router.post("/add", addOneUser);
Router.delete("/delete/:userId", deleteOneUser);
Router.put("/update/:userId", updateOneUser);

module.exports = Router;

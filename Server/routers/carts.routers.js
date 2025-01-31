const express = require("express");
const {
  getAllCartItems,
  getOneCartItem,
  addToCart,
  deleteOneCartItem,
  updateOneCartItem,
} = require("../controllers/carts.controllers");

const Router = express.Router();

Router.get("/getAll", getAllCartItems);
Router.get("/get/:cartId", getOneCartItem);
Router.post("/add", addToCart);
Router.delete("/delete/:cartId", deleteOneCartItem);
Router.put("/update/:cartId", updateOneCartItem);

module.exports = Router;
const express = require("express");
const {
  getAllProduct,
  getOneProduct,
  addOneProduct,
  deleteOneProduct,
  updateOneProduct,
  getAllProductSeller
} = require("../controllers/products.controllers");
const Router = express.Router();

Router.get("/getAll", getAllProduct);
Router.get("/get/:productId", getOneProduct);
Router.post("/add", addOneProduct);
Router.delete("/delete/:productId", deleteOneProduct);
Router.put("/update/:productId", updateOneProduct);
Router.get("/productseller/:id", getAllProductSeller);
module.exports = Router;
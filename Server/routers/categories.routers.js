const express = require("express");
const {
    getAllCategories,
    addOnecategories,deleteOnecategories,updateOnecategories
} = require("../controllers/categories.controllers");
const Router = express.Router();

Router.get("/getAll", getAllCategories);
Router.post("/add", addOnecategories);
Router.put("/update/:categoriesId", updateOnecategories);
Router.delete("/delete/:categoriesId", deleteOnecategories);

module.exports = Router;
const express = require("express");
const {
    getAllCategories,
} = require("../controllers/categories.controllers");
const Router = express.Router();

Router.get("/getAll", getAllCategories);


module.exports = Router;
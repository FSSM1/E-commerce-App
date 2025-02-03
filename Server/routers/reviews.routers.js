const express = require("express");
const {
  submitReview,
  getReviewsByProduct,
} = require("../controllers/reviews.controllers");
const Router = express.Router();

Router.post("/submit", submitReview);
Router.get("/product/:productId", getReviewsByProduct);

module.exports = Router;

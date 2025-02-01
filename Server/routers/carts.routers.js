const express = require("express");
const { purchaseCart } = require("../controllers/carts.controllers");
const Router = express.Router();

// Router.get("/getAll", getAllCarts);
// Router.get("/get/:cartId", getOneCart);
// Router.post("/add", addOneCart);
// Router.delete("/delete/:cartId", deleteOneCart);
// Router.put("/update/:cartId", updateOneCart);
Router.post("/purchase", purchaseCart);

module.exports = Router;

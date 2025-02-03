const express = require("express");
const router = express.Router();
const { likeProduct, getLikedProducts } = require("../controllers/likesController");

// Like or unlike a product
router.post("/toggle", likeProduct);

// Get liked products for a user
router.get("/:user_id", getLikedProducts);

module.exports = router;

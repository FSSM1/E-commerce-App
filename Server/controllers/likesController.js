
const db = require("../database/index");
const Likes = db.Likes;
const Product = db.Product; // Assuming you have a Products model

// Toggle Like/Unlike Product
const likeProduct = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Check if the like already exists
    const existingLike = await Likes.findOne({
      where: { user_id, product_id },
    });

    if (existingLike) {
      // If exists, remove (Unlike)
      await existingLike.destroy();
      return res.json({ success: true, liked: false });
    } else {
      // If not, add (Like)
      await Likes.create({ user_id, product_id });
      return res.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Liked Products for a User
const getLikedProducts = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Fetch all liked product IDs for the user
    const likedProducts = await Likes.findAll({
      where: { user_id: user_id },
      attributes: ["product_id"],
    });

    // Extract product IDs from the likedProducts array
    const productIds = likedProducts.map((like) => like.product_id);

    // Fetch the actual products using the product IDs
    const products = await Product.findAll({
      where: { id: productIds }, // Filter products by the liked product IDs
    });

    res.send({ likedProducts: products }); // Send the full product details
  } catch (error) {
    console.error("Error fetching liked products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { likeProduct, getLikedProducts };

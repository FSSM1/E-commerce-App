const db = require("../database/index");
const Carts = db.Carts;

module.exports = {
  purchaseCart: async (req, res) => {
    try {
      const { userId, products } = req.body; // userId and products array from the frontend
      // Create a new cart
      const cart = await db.Carts.create({ userId });

      // Add products to the cart
      for (const product of products) {
        await cart.addProduct(product.id, {
          through: { quantity: product.quantity },
        });
      }

      res
        .status(201)
        .json({ message: "Purchase successful!", cartId: cart.id });
    } catch (err) {
      console.error("Error during purchase:", err);
      res.status(500).json({ message: "Failed to complete purchase" });
    }
  },
};

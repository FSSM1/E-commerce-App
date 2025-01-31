const db = require("../database/index");
const Cart = db.Cart;
module.exports = {
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || !quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data. Please provide valid userId, productId, and quantity.",
        });
      }
  
  
      const cartItem = await Cart.create({ userId, productId, quantity });
      res.status(201).json({
        success: true,
        message: "Product added to cart",
        data: cartItem,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error adding product to cart",
      })
    }
  },


getAllCartItems: async (req, res) => {
    try {
    const { userId } = req.params;
    const cartItems = await Cart.findAll({
        where: { userId },
        include: [{ model: db.Product, as: "product" }], 
    });

    res.status(200).json({
        success: true,
        message: "Cart items retrieved successfully",
        data: cartItems,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({
        success: false,
        message: "Error retrieving cart items",
    });
    }
},


getOneCartItem: async (req, res) => {
    try {
    const { id } = req.params;
    const cartItem = await Cart.findByPk(id, {
        include: [{ model: db.Product, as: "product" }], 
    });

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Cart item retrieved successfully",
        data: cartItem,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error retrieving cart item",
      });
    }
  },


  deleteOneCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Cart.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error deleting cart item",
      });
    }
  },

 
  updateOneCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const [updated] = await Cart.update(
        { quantity },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      const updatedCartItem = await Cart.findByPk(id);
      res.status(200).json({
        success: true,
        message: "Cart item updated successfully",
        data: updatedCartItem,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error updating cart item",
      });
    }
  }
}

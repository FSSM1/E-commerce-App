const db = require("../database/index");
const Category = db.Category;

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res
        .status(200)
        .send({ message: "success to get all Categories", data: categories });
    } catch (err) {
      console.error({ messageError: "unable to get all categories", error: err });
    }
  },

};

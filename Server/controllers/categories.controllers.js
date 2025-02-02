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
  addOnecategories: async (req, res) => {
    try {
      const categories = await Category.create(req.body);
      res.send({ message: "success to add one categorie", data: categories });
    } catch (err) {
       
      console.error({ messageError: "unable to add one categorie", error: err });
    }
  },
  deleteOnecategories: async (req, res) => {
    try {
      await Category.destroy({ where: { id: req.params.categoriesId } });
      res.send({ message: "success to delete one categories" });
    } catch (err) {
      console.error({ messageError: "unable to delete one categories", error: err });
    }
  },

  updateOnecategories: async (req, res) => {
    try {
      await Category.update(req.body, { where: { id: req.params.categoriesId } });
      res.send({ message: "success to update one categories" });
    } catch (err) {
      console.error({ messageError: "unable to update one categories", error: err });
    }
  },
};


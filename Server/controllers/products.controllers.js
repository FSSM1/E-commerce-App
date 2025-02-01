const db = require("../database/index");
const Product = db.Product;

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.findAll();
      res
        .status(200)
        .send({ message: "success to get all Product", data: products });
    } catch (err) {
      console.error({ messageError: "unable to get all Product", error: err });
    }
  },
  getAllProductSeller: async (req, res) => {
    try {
      const {id}=req.params
      const products = await Product.findAll({where: { userId: id}});
      res
        .status(200)
        .send({ message: "success to get all Product", data: products });
    } catch (err) {
      console.error({ messageError: "unable to get all Product", error: err });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      res.send({ message: "success to get one Product", data: product });
    } catch (err) {
      console.error({ messageError: "unable to get one Product", error: err });
    }
  },
  addOneProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.send({ message: "success to add one Product", data: product });
    } catch (err) {
      
      console.error({ messageError: "unable to add one Product", error: err });
    }
  },
  deleteOneProduct: async (req, res) => {
    try {
      await Product.destroy({ where: { id: req.params.productId } });
      res.send({ message: "success to delete one Product" });
    } catch (err) {
      console.error({
        messageError: "unable to delete one Product",
        error: err,
      });
    }
  },
  updateOneProduct: async (req, res) => {
    try {
      await Product.update(req.body, { where: { id: req.params.productId } });
      res.send({ message: "success to update one Product" });
    } catch (err) {
      console.error({
        messageError: "unable to update one Product",
        error: err,
      });
    }
  },
};

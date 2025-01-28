const db = require("../database/index");
const Users = db.User;

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.findAll();
      res.send({ message: "success to get all users", data: users });
    } catch (err) {
      console.error({ messageError: "unable to get all users", error: err });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.userId);
      res.send({ message: "success to get one user", data: user });
    } catch (err) {
      console.error({ messageError: "unable to get one user", error: err });
    }
  },
  addOneUser: async (req, res) => {
    try {
      const user = await Users.create(req.body);
      res.send({ message: "success to add one user", data: user });
    } catch (err) {
      console.error({ messageError: "unable to add one user", error: err });
    }
  },
  deleteOneUser: async (req, res) => {
    try {
      await Users.destroy({ where: { id: req.params.userId } });
      res.send({ message: "success to delete one user" });
    } catch (err) {
      console.error({ messageError: "unable to delete one user", error: err });
    }
  },
  updateOneUser: async (req, res) => {
    try {
      await Users.update(req.body, { where: { id: req.params.userId } });
      res.send({ message: "success to update one user" });
    } catch (err) {
      console.error({ messageError: "unable to update one user", error: err });
    }
  },
};

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("carts", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return Cart;
};

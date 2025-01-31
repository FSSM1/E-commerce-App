module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("carts", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
     // allowNull: false,
     // defaultValue: 1,
    },
  });

  return Cart;
};
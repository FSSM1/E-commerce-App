module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("likes", {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Define the table name for reference
        key: "user_id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products", // Define the table name for reference
        key: "product_id",
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, { timestamps: false });

  return Likes;
};

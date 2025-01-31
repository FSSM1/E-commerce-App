module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("categories", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{timestamps : false});
  return Category;
};

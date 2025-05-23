module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("admin", "client", "seller"),
      defaultValue: "client",
      allowNull: false,
    },
    resetPasswordToken:{
      type: DataTypes.STRING,
      allowNull: true,
    },   resetPasswordExpires:{
      type: DataTypes.STRING,
      allowNull: true,
    },

  },{timestamps : false});
  return User;
};

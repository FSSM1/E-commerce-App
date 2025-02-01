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
      //unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("admin", "user", "seller", "client"),
      defaultValue: "user",
    },
  }, { timestamps: false });
  return User;
    
};

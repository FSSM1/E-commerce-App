const { Sequelize } = require("sequelize");
const config = require("./config");
const dbConfig = config.development_mode;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.localhost,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected ");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.reviews = require("./models/reviews")(sequelize, Sequelize);

db.User = require("./models/users")(sequelize, Sequelize);
db.Product = require("./models/products")(sequelize, Sequelize);
db.Category = require("./models/categories")(sequelize, Sequelize);
db.Carts = require("./models/carts")(sequelize, Sequelize);
db.Review = require("./models/reviews")(sequelize, Sequelize);
db.Likes = require("./models/likes")(sequelize, Sequelize);
db.Message = require("./models/messages")(sequelize, Sequelize);

db.User.hasMany(db.Carts);
db.Carts.belongsTo(db.User);

db.User.hasMany(db.Product);
db.Product.belongsTo(db.User);

db.Product.belongsTo(db.Category);
db.Category.hasMany(db.Product);

db.Carts.belongsToMany(db.Product, { through: "carts_products" });
db.Product.belongsToMany(db.Carts, { through: "carts_products" });

// Relationship between User and Review && Product and Review
db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Product.hasMany(db.Review);
db.Review.belongsTo(db.Product);

// Set up Many-to-Many Relationship
db.User.belongsToMany(db.Product, { through: db.Likes, foreignKey: "user_id" });
db.Product.belongsToMany(db.User, {
  through: db.Likes,
  foreignKey: "product_id",
});
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("phrase table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// Export the sequelize instance and the Expense model
module.exports = db;

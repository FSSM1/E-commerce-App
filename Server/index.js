// app.js (or wherever your main app file is)
const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();
const db = require("./database/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Import routes
const cartsRouter = require("./routers/carts.routers");
const productsRouter = require("./routers/products.routers");
const usersRouter = require("./routers/users.routers");
const categoriesRouter = require("./routers/categories.routers");

// Import the Multer router
const multerRouter = require("./routers/multer");

app.use("/uploads", express.static("uploads"));


app.use(cookieParser());
app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use(express.json());
app.use(cors());

// Use routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);

// Multer image upload route
app.use("/api/upload", multerRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

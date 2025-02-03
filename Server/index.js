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
const adminrouter = require("./routers/admin.routers");
const messagesRoutes = require("./routers/messages.routers");
const reviewsRoutes = require("./routers/reviews.routers");

// Import the Multer router
const multerRouter = require("./routers/multer");

app.use("/uploads", express.static("uploads"));
const likesRoutes = require("./routers/LikedRouters");

app.use(cookieParser());
app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use(express.json());
app.use(cors());

// Use routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/admin", adminrouter);
app.use("/api/messages", messagesRoutes);
app.use("/api/reviews", reviewsRoutes);

app.use("/api/likes", likesRoutes); // Add Likes API

// Multer image upload route
app.use("/api/upload", multerRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

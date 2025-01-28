const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();
const db = require("./database/index");
const cors = require("cors");
// Import routes
// const expensesRouter = require("./routes/expenseRoutes");

app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use(express.json());
app.use(cors());

// Use routes
// app.use("/api/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const express = require("express");
const { addOneMessage } = require("../controllers/messages.controllers");
const Router = express.Router();

// Create a new message
Router.post("/add", addOneMessage);

module.exports = Router;

const express = require("express");

const Router = express.Router();
const userController = require("../Controllers/UserController");

Router.get("/", userController.getAllUser);

module.exports = Router;

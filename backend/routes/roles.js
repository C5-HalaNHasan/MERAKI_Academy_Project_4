//roles routes file is set up  to define usersRouter and users APIs
const express = require("express");
const { createNewRole } = require("../controllers/roles");

//create userRouter
const rolesRouter = express.Router();

//endpoint for createNewUser: POST request
rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;

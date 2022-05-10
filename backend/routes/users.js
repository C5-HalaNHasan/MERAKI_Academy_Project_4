//users routes file is set up  to define usersRouter and users APIs
const express = require("express");
const { createNewUser, getAllUsers, login, updateUserProfile, deleteUser,} = require("../controllers/users");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

//create userRouter
const usersRouter = express.Router();

//endpoint for createNewUser: POST request
usersRouter.post("/", createNewUser);

//endpoint for getAllUsers: GET request
usersRouter.get("/", authentication, authorization("GET_USERS"), getAllUsers); //! this permiision is for the admin role

//endpoint for getAllUsers: DELETE request
usersRouter.delete( "/:id", authentication, authorization("DELETE_USER"), deleteUser); //! this permiision is for the admin role

//endpoint for login: POST request
usersRouter.post("/login", login);

//endpoint for updateUserProfile: POST request
usersRouter.post("/update", authentication, updateUserProfile);

module.exports = usersRouter;

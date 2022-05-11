//cart routes file is set up  to define itemsRouter and items APIs
const express=require("express");
const {createNewCart,getCartItems,addCartItem,deleteCartItem } = require("../controllers/cart");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

//create cartRouter
const cartRouter=express.Router()

//endpoint for createNewCart: POST request
cartRouter.post("/",authentication, createNewCart);

//endpoint for getCartItems: GET request
cartRouter.get("/",authentication, getCartItems);

//endpoint for addCartItem: POST request
cartRouter.post("/:id",authentication, addCartItem);

//endpoint for deleteCartItem: DELETE request
cartRouter.delete("/:id",authentication, deleteCartItem);
















module.exports=cartRouter;
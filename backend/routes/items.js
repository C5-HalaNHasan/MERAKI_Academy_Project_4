//items routes file is set up  to define itemsRouter and items APIs
const express=require("express");
const { createNewItem,getAllItems,getItemById,updateItemById,deleteItemById,getItemsByRating} = require("../controllers/items");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

//create itemsRouter
const itemsRouter=express.Router()

//endpoint for createNewItem: POST request
itemsRouter.post("/",authentication, createNewItem);

//endpoint for getAllItems: GET request
itemsRouter.get("/",authentication, getAllItems);

//endpoint for getItemById: GET request
itemsRouter.get("/:id",authentication, getItemById);

//endpoint for updateItemById: PUT request
itemsRouter.put("/:id",authentication, updateItemById);

//endpoint for deleteItemById: DELETE request
itemsRouter.delete("/:id",authentication, deleteItemById);

//endpoint for getItemsByRating: GET request
itemsRouter.get("/:rating",authentication, getItemsByRating);  //! to be added and updated later in the project
















module.exports=itemsRouter;
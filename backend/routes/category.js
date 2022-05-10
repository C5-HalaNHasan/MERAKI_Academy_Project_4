//users routes file is set up  to define categoryRouter and items APIs
const express=require("express");
const { createNewCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById} = require("../controllers/category");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

//create categoryRouter
const categoryRouter=express.Router()

//endpoint for createNewCategory: POST request
categoryRouter.post("/",authentication,authorization("CREATE_CATEGORY"), createNewCategory); //! this permission is for the admin role

//endpoint for getAllCategories: GET request
categoryRouter.get("/",authentication, getAllCategories); 

//endpoint for getCategoryById: GET request
categoryRouter.get("/:id", getCategoryById); 

//endpoint for updateCategoryById: PUT request
categoryRouter.put("/:id", authentication, authorization("UPDATE_CATEGORY"), updateCategoryById); //! this permission is for the admin role

//endpoint for deleteCategory: DELETE request
categoryRouter.delete( "/:id", authentication, authorization("DELETE_CATEGORY"), deleteCategoryById); //! this permission is for the admin role






module.exports=categoryRouter;
const categoryModel = require("../models/categorySchema");



// this function creates new category (for admin role):
const createNewCategory= (req, res) => {
  const { category } = req.body;

  //first check if the entered category is in the database or not: if not it will be added, if it exists it will not,
  categoryModel
    .findOne({ category: category })
    .then((result) => {
      if (result) {
        res.status(409).json({
          result: {
            success: false,
            message: "This category exists!",
          },
        });
      } else {
        const newCategory = categoryModel({category});
        newCategory.save() .then((result) => {
            res.status(201).json({
              result: {
                success: true,
                message: "Category Created Successfully",
                category: newCategory,
              },
            });
          })
          .catch((error) => {
            res.status(406).json(error.message);
          });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// this function gets all categories:
const getAllCategories= (req, res) => {
  categoryModel.find().then((result)=>{ 
    if(result.length >0){ 
      res.status(200).json({
        success:true,
        categories:result,
      })
    }else{
      res.status(404).json({
        success:false,
        message:"no categories found"
      })
    }
}).catch((error)=>{
 res.status(500).json({
   success:false,
   error:error.message,
 })
})      
};

// this function gets a category by its id:
const getCategoryById= (req, res) => {
};

// this function updates a category by its id:
const updateCategoryById= (req, res) => {
};

// this function updates a category by its id:
const deleteCategoryById= (req, res) => {
};

module.exports = {
    createNewCategory,
     getAllCategories, 
     getCategoryById, 
     updateCategoryById, 
     deleteCategoryById,

};

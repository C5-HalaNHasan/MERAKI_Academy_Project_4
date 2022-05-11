const userModel = require("../models/userSchema");
const itemModel = require("../models/itemSchema");
const categoryModel = require("../models/categorySchema");



// this function creates new item:
const createNewItem= (req, res) => {
  const { item, description, swap, sell, category,photos,swapConfirmed } = req.body;
  //owner attribute is going to be taken from the token (userId)
  const userId=req.token.userId;
  const owner=userId;

        const newItem = new itemModel({ owner, item, description, swap, sell, category,photos,swapConfirmed });
        newItem.save().then((result) => {
            res.status(201).json({
              result: {
                success: true,
                message: "Item Created Successfully",
                item: newItem,
              },
            });
          }).catch((error) => {
            res.status(406).json(error.message);
          });
};


// this function gets all items: //! to be rendered on the screen
const getAllItems= (req, res) => {
   itemModel.find().then((result)=>{
        if(result.length >0){ 
          res.status(200).json({
            success:true,
            items:result,
          })
        }else{
          res.status(404).json({
            success:false,
            message:"no items found"
          })

        }
   }).catch((error)=>{
     res.status(500).json({
       success:false,
       error:error.message,
     })
   })      
};

// this function gets an item by its id:
const getItemById= (req, res) => {
  let itemId=req.params.id;
  itemModel.findOne({_id:itemId}).then((result)=>{
    if(result){
      res.status(200).json({
        success:true,
        item:result
      })
    }
  }).catch((error)=>{
    res.status(500).json({
      success:false,
      error:error.message
    })
  })
};

// this function updates an item by its id:
const updateItemById= (req, res) => {
  let{  swapConfirmed,isSold,description,swap,sell,photos} =req.body;
  let itemId=req.params.id;
  itemModel.findOneAndUpdate({_id:itemId},{swapConfirmed,isSold,description,swap,sell,photos},{new:true}).then((result)=>{
    console.log(result)//!
   if(result){
      res.status(200).json({
        success:true,
        updatedItem:result,
      })
    }
  }).catch((error)=>{
    res.status(500).json({
      success:false,
      error:error.message
    })
  })
};

// this function deletes an item by its id:
const deleteItemById= (req, res) => {
  let itemId=req.params.id;
  itemModel.findOneAndDelete({_id:itemId}).then((result)=>{
    console.log(result)//!
   if(result){
      res.status(200).json({
        success:true,
        message:`item ${itemId} has been deleted`
      })
    }else{
      res.status(404).json({
        success:false,
        message:`item ${itemId} is not in the data base`
      })

    }
  }).catch((error)=>{
    res.status(500).json({
      success:false,
      error:error.message
    })
  })
};

// this function gets all items with a specific rating:
const getItemsByRating= (req, res) => { //! not tested by postman yet since the rating hasn't beedn added to the items
  let rating=req.params.rating;
  itemModel.find({rating:rating}).then((result)=>{
    if(result){
      res.status(200).json({
        success:true,
        item:result
      })
    }
  }).catch((error)=>{
    res.status(500).json({
      success:false,
      error:error.message
    })
  })
};


module.exports = {
    createNewItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById,
    getItemsByRating,
};

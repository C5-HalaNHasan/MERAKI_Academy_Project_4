const userModel = require("../models/userSchema");
const itemModel = require("../models/itemSchema");
const categoryModel = require("../models/categorySchema");



// this function creates new item:
const createNewItem= (req, res) => {
  const { item, description, swap, sell, category,photos,swapConfirmed,price } = req.body;
  //owner attribute is going to be taken from the token (userId)
  const userId=req.token.userId;
  const owner=userId;

        const newItem = new itemModel({ owner, item, description, swap, sell, category,photos,swapConfirmed,price });
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
   itemModel.find().populate({path:"owner",model:"user"}).populate({path:"category",model:"category"}).then((result)=>{ //! can't populate the category,it keeps giving an error in the search box component
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
const getItemById= (req, res) => { //! user populated on 17/5 tuesday
  let itemId=req.params.id;
  itemModel.findOne({_id:itemId}).populate({path:"category",model:"category"}).populate({path:"owner",model:"user"}).then((result)=>{
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
  let{  swapConfirmed,isSold,description,swap,sell,photos,price,owner} =req.body;
  let itemId=req.params.id;
  itemModel.findOneAndUpdate({_id:itemId},{swapConfirmed,isSold,description,swap,sell,photos,owner},{new:true}).populate({path:"category",model:"category"}).then((result)=>{
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

// this function gets all items with a specific category:
const getItemsByCategory= (req, res) => { //! not tested by postman yet since the rating hasn't beedn added to the items
  let category=req.params.id;
  itemModel.find({category:category}).populate({path:"category",model:"category"}).populate({path:"owner",model:"user"}).then((result)=>{
    
    if(result){
      res.status(200).json({
        success:true,
        items:result
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
    getItemsByCategory,
};

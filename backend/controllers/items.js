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


// this function gets all items:
const getAllItems= (req, res) => {
};

// this function gets an item by its id:
const getItemById= (req, res) => {
};

// this function updates an item by its id:
const updateItemById= (req, res) => {
};

// this function deletes an item by its id:
const deleteItemById= (req, res) => {
};

// this function gets all items with a specific rating:
const getItemsByRating= (req, res) => {
};


module.exports = {
    createNewItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById,
    getItemsByRating,
};

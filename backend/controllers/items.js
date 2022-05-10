const userModel = require("../models/userSchema");
const itemModel = require("../models/itemSchema");
const categoryModel = require("../models/categorySchema");



// this function creates new item:
const createNewItem= (req, res) => {
  const { owner, item, description, exchange, sell, category,photos } = req.body;

        const newItem = new itemModel({ owner, item, description, exchange, sell, category,photos });
        newItem.save().then((result) => {
            res.status(201).json({
              result: {
                success: true,
                message: "Item Added Successfully",
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

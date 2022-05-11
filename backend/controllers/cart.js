const userModel = require("../models/userSchema");
const itemModel = require("../models/itemSchema");
const cartModel = require("../models/cartSchema");



// this function creates new cart for the current user when has no items in the before:
const createNewCart= (req, res) => {
  const {cartItems} = req.body;
  const userId=req.token.userId;
  const owner=userId;
  cartModel.find({ owner:userId}).then((result)=>{ //to ensure that there is only one cart for each user
      if(result.length ===0){
        const newCart = new cartModel({owner,cartItems});
        newCart.save().then((result) => {
            res.status(201).json({
                success: true,
                message: "Cart Created Successfully",
                cart: newCart,
            });
          }).catch((error) => {
            res.status(406).json(error.message);
          });

      }
  })
       
};


// this function gets all cart items for a specific user:
const getCartItems= (req, res) => {
    const userId=req.token.userId; //to search in cartModel by a spcific user to render his items later in the front end
    cartModel.findOne({owner:userId}).then((result)=>{ //to ensure that there is only one cart for each user
        if(result.cartItems.length ===0){
              res.status(404).json({
                  success: false,
                  message: "No Items Found",
            })
        }else{
            res.status(200).json({
                  success: true,
                  cartItems: result.cartItems,
        })
    }
    }).catch((error)=>{
        res.status(500).json({
            success:false,
            error:error.message
        })
    })
};

// this function adds an item to the cart by item id:
const addCartItem= (req, res) => {
};

// this function deletes an item from the cartby its id:
const deleteCartItem = (req, res) => {
};




module.exports = {
    createNewCart,
    getCartItems,
    addCartItem,
    deleteCartItem ,
};

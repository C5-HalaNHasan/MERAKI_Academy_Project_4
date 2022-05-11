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
    cartModel.findOne({owner:userId}).then((result)=>{
        if(result){ 
            if(result.cartItems.length ===0 ){
                res.status(404).json({
                    success: false,
                    message: "No Items Found",
              })
          }else if(result.cartItems.length>0){
              res.status(200).json({
                    success: true,
                    cartItems: result.cartItems,
          })
      }
            
        }else{
            res.status(404).json({
                success:false,
                message:"this user doesn't have a cart!"
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
    const userId=req.token.userId; 
    let addedItemId=req.params.id;
    cartModel.findOne({owner:userId}).then((result1)=>{
        if(!result1.cartItems.includes(addedItemId)){ // to check that the item is only added one time only to the cart
           
    cartModel.updateOne({owner:userId},{$push:{ cartItems:addedItemId}}).then((result)=>{
        if(result.matchedCount==1){
            res.status(201).json({
                success:true,
                messgae:`item ${addedItemId} added successfully to the cart`
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            success:false,
            error:error.message
        })
    })

}else{
    res.status(406).json({
        success:false,
        message:"This item has already been added to your cart!"
    })

}
}).catch((error1)=>{
    res.status(500).json({
        success:false,
        error:error1.message
    })
})
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

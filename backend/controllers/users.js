const userModel = require("../models/userSchema");
const itemModel=require("../models/itemSchema");
const roleModel = require("../models/roleSchema");
//for registration & login (hash,compare password & create token)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// this function creates new user account/registration:
const createNewUser = (req, res) => {
  const { firstName, lastName, country, email, password, role,contactNum } = req.body;

  //first check if the entered email is in the database or not: if not it will be added, if it exists it will not,
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        res.status(409).json({
          result: {
            success: false,
            message: "This email has already registered!",
          },
        });
      } else {
        const newUser = new userModel({
          firstName,
          lastName,
          country,
          email,
          password,
          role,
          contactNum,
        });
        newUser
          .save()
          .then((result) => {
            res.status(201).json({
              result: {
                success: true,
                message: "Account Created Successfully",
                user: newUser,
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

// this function gets all registered users (for admin role)
const getAllUsers = (req, res) => {
  userModel
    .find()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          users: result,
        });
      } else {
        res.status(404).json({
          success: false,
          error: "no users found ",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};

// this function logins the user:
const login = (req, res) => {
  let { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .populate("role", " -_id -__v")
    .then((result) => {
      if (result) {
        bcrypt.compare(password, result.password, (err, result1) => {
          if (result1 === true) {
            let payload = {
              userId: result._id,
              userCountry:result.country,
              userEmail: result.email,
              firstName: result.firstName,
              role: result.role,
            };

            let options = { expiresIn: "500m" }; //! increased for testing
            // tokin is going to be generated for each successful login (it holds all the user info as per the payload)
            const token = jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
              success: true,
              message: "Valid login credentials",
              userId:result._id,
              userCountry:result.country.toLowerCase(),
              token: token,
            });
          } else {
            res.status(403).json({
              success: false,
              message: "The password you’ve entered is incorrect",
            });
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The email doesn't exist",
        });
      }
    });
};


// this function updates user personal profile (firstName,lastName,password,photo,country)
const updateUserProfile = (req, res) => {
  //the user id is going to be taken from the token
  const userId = req.token.userId;
  let { firstName, lastName, password, photo, country,contactNum } = req.body;

   // to hash the password before update:
   if(password !==undefined){ //! not working yet
     let salt=10;
    bcrypt.hash(password, salt, (err, hash) => {
      password=hash;
      console.log("hashed password",hash);
    });
   }
  //search for the user by his id,then update
  userModel
    .findByIdAndUpdate(
      userId,
      { firstName, lastName, password, photo, country,contactNum },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          //! check if it's going to be used or not
          newProfile: result,
        });
      } else {
        res.status(404).json({
          success: false,
          error: "user not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};


// this function deletes user (for admin role)
const deleteUser = (req, res) => {
  //the user id is going to be taken from the params
  const userId = req.params.id;
  //search for the user by his id,then delete,but first it must be ensured that the current admin is not trying to remove himself from the database:
  if(userId !== req.token.userId){
    userModel .findByIdAndRemove(userId).then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: `user ${userId} has been deleted!`
        });
      } else {
        res.status(404).json({
          success: false,
          error: "user not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
  }else{
    res.status(403).json({
      success:false,
      message:"you can't delete this account"
    })
  }
};

// this function adds an item by its id to the user wishList
const addToWishList=(req,res)=>{
  let userId=req.token.userId;
  let itemToWishList=req.params.id;
  itemModel.findOne({_id:itemToWishList}).then((result2)=>{ //!user shouldn't be able to add his items to his wishlist
    if(result2.owner != userId){
      //first check if the item is already in the wishList or if the user is the owner:
  userModel.findOne({_id:userId}).then((result1)=>{
    console.log(result1) //!
    if(result1 && result1.wishList.includes(itemToWishList)===false ){ 
      userModel.findOneAndUpdate({_id:userId},{$push:{wishList:itemToWishList}},{new:true}).populate("wishList").then((result)=>{
        console.log(result)
        res.status(200).json({
          success:true,
          wishList:result.wishList,
        })
      }).catch((error)=>{
        res.status(500).json({
          success:false,
          error:error.message,
        })
      })
    }else{
      res.status(406).json({
        success:false,
        message:`item ${itemToWishList} is already in your wishList!`
      })
    }
  })

    }else{
      res.status(403).json({
        success:false,
        message:"user can't add his items to wishlist",
      })
    }
  }).catch((error2)=>{
    res.status(500).json({
      success:false,
      error:error2.message,
    })
  })
  
};

// this function adds an item by its id to the user wishList
const removeFromWishList=(req,res)=>{
  let userId=req.token.userId;
  let delItemFromWishList=req.params.id;
  //first check if the item is already in the wishList:
  userModel.findOne({_id:userId}).then((result1)=>{
    if(result1 && result1.wishList.includes(delItemFromWishList)===true){
      userModel.findOneAndUpdate({_id:userId},{$pull:{wishList:delItemFromWishList}},{new:true}).then((result)=>{
        console.log(result)
        res.status(200).json({
          success:true,
          wishList:result.wishList,
        })
      }).catch((error)=>{
        res.status(500).json({
          success:false,
          error:error.message,
        })
      })
    }else{
      res.status(406).json({
        success:false,
        message:`item ${delItemFromWishList} is already not in your wishList!`
      })
    }
  })
};

// this function adds an item by its id to the user cart
const  addToCart=(req,res)=>{
  let userId=req.token.userId;
  let AddItemToCart=req.params.id;
  //first check if the item is already in the cart or if the user is the owner:
  itemModel.findOne({_id:AddItemToCart}).then((result2)=>{ //!user shouldn't be able to add his items to his cart
    if(result2.owner != userId){
      userModel.findOne({_id:userId}).then((result1)=>{
        // console.log(result1) //!
        if(result1 && result1.cartItems.includes(AddItemToCart)===false ){ 
          userModel.findOneAndUpdate({_id:userId},{$push:{cartItems:AddItemToCart}},{new:true}).populate("cartItems").then((result)=>{
            // console.log(result)
            res.status(200).json({
              success:true,
              cartItems:result.cartItems,
            })
          }).catch((error)=>{
            res.status(500).json({
              success:false,
              error:error.message,
            })
          })
        }else{
          res.status(406).json({
            success:false,
            message:`item ${AddItemToCart} is already in your cart!`
          })
        }
      })

    }else{
      res.status(403).json({
        success:false,
        message:"user can't add his items to cart",
      })
    }

  }).catch((error2)=>{
    res.status(500).json({
      success:false,
      error:error2.message,
    })

  })
  
};


// this function deletes an item by its id from the user cart
const  removeFromCart=(req,res)=>{
  let userId=req.token.userId;
  let removedFromCart=req.params.id;
  //first check if the item is already in the cart or if the user is the owner:
  userModel.findOne({_id:userId}).then((result1)=>{
    console.log(result1) //!
    if(result1 && result1.cartItems.includes(removedFromCart)===true ){ //!user shouldn't be able to add his items to the wish list
      userModel.findOneAndUpdate({_id:userId},{$pull:{cartItems: removedFromCart}},{new:true}).populate("cartItems").then((result)=>{
        // console.log(result)
        res.status(200).json({
          success:true,
          cartItems:result.cartItems,
        })
      }).catch((error)=>{
        res.status(500).json({
          success:false,
          error:error.message,
        })
      })
    }else{
      res.status(406).json({
        success:false,
        message:`item ${ removedFromCart} is not in your cart!`
      })
    }
  })
};

// this function gets a user by id where the id is taken from token(to render cart and wishlist when the user logs in)
const getUserById = (req, res) => {
  let userId=req.token.userId;
  userModel
    .findOne({_id:userId}).populate({path:"wishList"}).populate({path : "wishList",populate : {path : "owner"}}).populate({path : "wishList",populate : {path : "category"}}).populate({path:"boughtItems"}).populate({path : "boughtItems",populate : {path : "owner"}}).populate({path : "boughtItems",populate : {path : "category"}}).populate({path:"cartItems"}).populate({path : "cartItems",populate : {path : "owner"}}).populate({path : "cartItems",populate : {path : "category"}}).
    exec() //! to be checked,it only returns one object
    .then((result) => {
      console.log(result) //! to get the info of the wishList items from here
      if (result) {
        res.status(200).json({
          success: true,
          user: result,
        });
      } else {
        res.status(404).json({
          success: false,
          error: "this user is not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};


module.exports = {
  createNewUser,
  getAllUsers, //! for admin role
  login,
  updateUserProfile,
  deleteUser,
  addToWishList,
  removeFromWishList,
  addToCart,
  removeFromCart,
  getUserById,
};

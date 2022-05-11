const userModel = require("../models/userSchema");
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
              userEmail: result.email,
              firstName: result.firstName,
              role: result.role,
            };

            let options = { expiresIn: "60m" };
            // tokin is going to be generated for each successful login (it holds all the user info as per the payload)
            const token = jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
              success: true,
              message: "Valid login credentials",
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
  const { firstName, lastName, password, photo, country,contactNum } = req.body;
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
  //first check if the item is already in the wishList:
  userModel.findOne({_id:userId}).then((result1)=>{
    if(result1 && result1.wishList.includes(itemToWishList)===false){
      userModel.findOneAndUpdate({_id:userId},{$push:{wishList:itemToWishList}},{new:true}).then((result)=>{
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
};

// this function adds an item by its id to the user wishList
const removeFromWishList=(req,res)=>{
  let userId=req.token.userId;
  let delItemFromWishList=req.params.id;
  //first check if the item is already in the wishList:
  userModel.findOne({_id:userId}).then((result1)=>{
    if(result1 && result1.wishList.includes(delItemFromWishList)===false){
      userModel.findOneAndUpdate({_id:userId},{$pull:{wishList:[delItemFromWishList]}},{new:true}).then((result)=>{
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


module.exports = {
  createNewUser,
  getAllUsers, //! for admin role
  login,
  updateUserProfile,
  deleteUser,
  addToWishList,
  removeFromWishList,
};

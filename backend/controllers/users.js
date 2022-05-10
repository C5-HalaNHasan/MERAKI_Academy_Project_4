
const userModel=require("../models/userSchema");
const roleModel=require("../models/roleSchema");
const itemModel=require("../models/itemSchema");
//for registration & login (hash,compare & create token)
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const createNewUser=(req,res)=>{
    const {firstName,lastName,country,email,password,role}=req.body;

    //first check if the entered email is in the database or not: if not it will be added, if it exists it will not,
    userModel.findOne({email:email}).then((result)=>{
        if(result){
            res.status(409).json({
                result:{
                    success: false,
                    message: "This email has already registered!",
                }
            })
        }else{
            const newUser=new userModel({
                firstName,lastName,country,email,password,role
            })
            newUser.save().then((result)=>{
                res.status(201).json({
                    result:{
                        success: true,
                        message: "Account Created Successfully",
                       user: newUser
                    }
                })
    
            }).catch((error)=>{
                res.status(406).json(error.message)
            })
        }
    }).catch((error)=>{console.log(error.message)})

    };

    module.exports={
        createNewUser,

    }
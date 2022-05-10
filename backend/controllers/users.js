
const userModel=require("../models/userSchema");
const roleModel=require("../models/roleSchema");
const itemModel=require("../models/itemSchema");

//for registration & login (hash,compare & create token)
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
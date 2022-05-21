
const mongoose=require("mongoose");

const itemSchema= new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    item:{type:String,required:true},
    description:{type:String,required:true},
    swap:{type:Boolean,required:true,default:true},
    sell:{type:Boolean,required:true,default:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    photos: {type:String}, 
    rating:{type:Number,min:0,max:5},//! not used in the project yet
    swapConfirmed:{type:Boolean,required:false,default:true}, //! not used in the project yet
    isSold:{type:Boolean,default:false},//! not used in the project yet
    addedOn:{type:Date,default:Date.now()},
    price:{type:Number,required:true},
})

module.exports=mongoose.model("item",itemSchema);
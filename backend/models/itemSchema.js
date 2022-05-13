
const mongoose=require("mongoose");

const itemSchema= new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    item:{type:String,required:true},
    description:{type:String,required:true},
    swap:{type:Boolean,required:true},
    sell:{type:Boolean,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    photos: [{type:String}], //! to be updated later by cloudinary
    rating:{type:Number,min:0,max:5},
    swapConfirmed:{type:Boolean,required:true,default:true},
    isSold:{type:Boolean,default:false},
    addedOn:{type:Date,default:Date.now()}
})

module.exports=mongoose.model("item",itemSchema);
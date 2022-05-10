
const mongoose=require("mongoose");

const itemSchema= new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    item:{type:String,required:true},
    description:{type:String,required:true},
    exchange:{Boolean,required:true},
    sell:{Boolean,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    //! photos: [{type:String}]to be added later,
    //!rating:to be added later,
})

module.exports=mongoose.model("item",itemSchema);
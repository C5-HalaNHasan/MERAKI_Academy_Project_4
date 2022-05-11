
const mongoose=require("mongoose");

const cartSchema= new mongoose.Schema({
    cartItems:[{type:mongoose.Schema.Types.ObjectId,ref:"item"}],
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
})

module.exports=mongoose.model("cart",cartSchema);
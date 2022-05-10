const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    country:{type:String},
    items:[{type:mongoose.Schema.Types.ObjectId,ref:"item"}],
    //! photo:{type:String} to be added later,
    role:{type:mongoose.Schema.Types.ObjectId,ref:"role"},
    //!rating:to be added later,
});

//a middleware to be executed before saving the user to the database:
userSchema.pre("save",async function(){
    SALT=10;
    this.email=this.email.toLowerCase();
    this.password=await bcrypt.hash(this.password,SALT);
});

module.exports = mongoose.model("user",userSchema);
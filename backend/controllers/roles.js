
const roleModel=require("../models/roleSchema");


const createNewRole=(req,res)=>{
    const {role,permissions}=req.body;

    const newRole=new roleModel({
        role,permissions
    })
    newRole.save().then((result)=>{
        res.status(201).json({
            result:{
                success: true,
                message: "Role Created Successfully",
               role: newRole
            }
        })

    }).catch((error)=>{
        res.status(406).json(error.message)
    })
};

module.exports={
    createNewRole,
}
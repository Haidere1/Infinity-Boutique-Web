import usersModel from "../models/users.js"

import jwt from "jsonwebtoken" 

export const finduser =async(req,res)=>{
    const user = await usersModel.findOne({userName:req.body.userName,password:req.body.password })

    if(user)
    {
        const token=jwt.sign({
            email:user.email,
            userName:user.userName,
            role:user.role
        },'userisin')
        return res.json({status:"ok hai",user:token})
    }
    else{
        return res.json({status:'error',user:false})
    }
}   
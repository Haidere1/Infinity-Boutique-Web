import mongoose from "mongoose";
const totalUsersStructure=mongoose.Schema(
    {
        userName:String,
        email: {type:String,unique:true},
        password:String,
        userImage:String,
        contact:Number,
        role: { type: String, default: 'user' }
    }
);
const usersModel=mongoose.model('RegisteredUser',totalUsersStructure);


export default usersModel;
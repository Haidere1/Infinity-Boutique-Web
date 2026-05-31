import { modelNames } from "mongoose";
import usersModel from "../models/users.js";
export const addUser = async (req, res) => {
  const { userName, email, password, userImage, contact } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'userName, email and password are required' });
  }

  const newUser = new usersModel({
    userName,
    email,
    password,
    userImage: userImage || '',
    contact: contact || '',
  });

  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log('User not added:', error.message);
    res.status(500).json({ message: 'Could not save user' });
  }
};

export const getUsers = async (req,res)=>{
try {
    const userslist= await usersModel.find();
    res.json(userslist);
    
} catch (error) {
    console.log("Couldnt Find Any Data  ")}
};

export const deleteUser = async (req,res ) =>{

    try{
        
        await usersModel.deleteOne( req.params.id);
        res.status(200).json({message:"User Deleted"});
      
    } catch (error) {
       console.log ("delete failed new")
    }
    
    }


    export const getUser = async (req, res) => {
        try {
            const  user=req.params.name;
            console.log(user);
            const pr = await usersModel.findOne({userName:user});
            res.json(pr);
        } catch (error) {
            console.log("Couldnt Find Any Data new ");
        }
    
    }
































    //terminal write getquery for database

    export const getsometing=async(req,res)=>{

        try{

            const result=await modelNames.find()
            res.json(result);

        }

        catch{
                res.json({message:"Noting was found"})
        }

    }

    //to delete something 

    export const deletedsomething=async(req,res)=>
    {
        
        await usersModel.deleteOne(req.params.id)
    }

    // to post something

    export const postsometing=async(req,res)=>
    {
        const something=new modelNames(
            {
                Id:req.body.id,
                name:req.body.name,
            }
        )

        try{
            await something.save();
            res.json(something)
        }
        catch{
            console.log("Nothing was found here that you could delete")
        }
    }

    //to update sometihng

    export const updatesomething=async(req,res)=>{

        try {

        const update= await modelNames.findByIDAndUpdate({_id:id},
                {

                })

        } catch (error) {
            
        }
    }
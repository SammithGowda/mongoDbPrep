const mongoose = require("mongoose")
const User = require("../schema/userSchema");
const Account = require("../schema/accountSchema")
const { getDB } = require("../connection");
const { request } = require("express");

const createUser = async(req,res)=>{
    const data = req.body;
    try {

        // const db= getDB()
        // const user = await db.collection("User").insertOne(data)
        const user = await User.create(data)
        res.status(201).send({mes:"Successfull",data:user})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

const getUser = async(req,res)=>{
    try {
        debugger
        const user = await User.find()
        res.status(200).send({success:true,data:user})
    } catch (error) {
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}

const updateUser = async(req,res)=> {
    const data = req.body.email
    try {
        const user = await User.updateOne({
            name:"Samm"
        },{
            $set:{'email':data}
        })
        res.status(200).send({success:true,data:user})
    } catch (error) {
        console.log(error);
        
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}

const deleteUser = async(req,res)=> {
    const userId = req.params.userId    
    try {
        const user = await User.findOne({_id:userId}) //userId must {}
        const name =user.name
        if(!user) throw Error("No user Found!")
        await User.findByIdAndDelete({_id:userId})
        res.status(200).send({success:true,data:`${name} User deleted successfully`})
    } catch (error) {
        res.status(505).send({
            success: false,
            message: error.message
          })
    }
}

const getUserAndAccount = async(req,res)=>{
    const userId = req.params.userId;
    
    try {
        // debugger
        const [user,accounts] = await Promise.all([
            User.findOne({_id: userId }), // Fetch user details
            Account.find({ userId })       // Fetch all accounts of the user
        ]);
        if(!user){
            return res.status(404).json({ success: false, message: "No user found for this userId" });
        }

        if(!accounts.length){
        return res.status(404).json({ success: false, message: "No accounts found for this user" });
        }
        return res.status(200).send({success:true,data:{user,accounts}})
    } catch (error) {
        return res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}

module.exports = {createUser,getUser,updateUser,deleteUser,getUserAndAccount}
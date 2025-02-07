const mongoose = require("mongoose")
const User = require("../schema/userSchema");
const { getDB } = require("../connection");

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
        const user = await User.find()
        res.status(200).send({success:true,data:user})
    } catch (error) {
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}

const updateUser = async(req,res)=>{
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

module.exports = {createUser,getUser,updateUser}
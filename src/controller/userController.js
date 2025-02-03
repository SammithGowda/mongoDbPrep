const mongoose = require("mongoose")
const User = require("../schema/userSchema");
const { getDB } = require("../connection");

const createUser = async(req,res)=>{
    const data = req.body;
    try {
        console.log(data,"req data")
        const db= getDB()
        const user = await db.collection("User").insertOne(data)
    
        res.status(201).send({mes:"Successfull",data:user})
    
        
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

module.exports = createUser
const mongoose = require("mongoose")
const Marks = require("../schema/testSchema");

const create = async(req,res)=>{
    const DATA = [
        { "name": "Alice", "marks": 85 },
        { "name": "Bob", "marks": 72 },
        { "name": "Charlie", "marks": 90 },
        { "name": "David", "marks": 65 },
        { "name": "Emma", "marks": 78 }
      ];
    try {
        const data = await Marks.insertMany(DATA)

        res.status(200).send({success:"Successfully  Created",data:data})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}
const get = async(req,res)=>{
    try {
        
        const data = await Marks.find({marks:{$gt:75}},"name marks -_id")
        //this above code to find all std who marks >75
        //and last values in query is  "name marks -_id" in query olny give name and marks "-"" will exclude _id
        // insted {name:1,marks;1,_id:0} we can use above
        
        res.status(200).send({success:"Successfully retrived ",data:data})
    } catch (error) {
        console.log(error.message)
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}



const deletE = async(req,res)=> {
    const userId = req.params.userId    
    try {
        // console.log(user)
        res.status(505).send({
            success: false,
            message: "explain"
          })
    } catch (error) {
        res.status(505).send({
            success: false,
            message: error.message
          })
    }
}



module.exports = {create,get,deletE}
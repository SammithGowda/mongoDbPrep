const mongoose = require("mongoose")
const Gender = require("../schema/genderSchema");

const createGender = async(req,res)=>{
    const data =[
        { "userId": 1, "Gender": "Male" },
        { "userId": 2, "Gender": "Female" },
        { "userId": 3, "Gender": "Male" },
        { "userId": 4, "Gender": "Female" },
      ]
      const dataGender = await Gender.insertMany(data)
    try {
        res.status(200).send({success:"Successfully Account Created",data:dataGender})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}
const getAndUpdateGender= async(req,res)=>{
    try {
        //update with aggregation query 
        /*
        doc will have id and Gender 
        write query to change male to female vise vers

        approach is update many with aggregation 
        */
        const updateData = await Gender.updateMany({},[{
            $set:{
                Gender:{$cond:{if:{$eq:['$Gender','Male']},then:"Female",else:"Male"}}
            }
        },
    ])
        // const updateData = await Gender.find()
        res.status(200).send({success:"Successfully retrived Account",data:updateData})
    } catch (error) {
        console.log(error.message)
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}
const deleteGender= async(req,res)=>{
    try {
        
        const updateData = await Gender.deleteMany()
        res.status(200).send({success:"Successfully drop Gender Collection",})
    } catch (error) {
        console.log(error.message)
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}



module.exports = {createGender,getAndUpdateGender,deleteGender}
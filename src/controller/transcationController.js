const mongoose = require("mongoose")
const Transaction = require("../schema/transcationSchema");

const createTracnscation = async(req,res)=>{
    const data = req.body;
    try {

        // const db= getDB()
        // const user = await db.collection("User").insertOne(data)
        const transcation = await Transaction.create(data)
        res.status(201).send({mes:"Successfull",data:transcation})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

const getTranscation = async(req,res)=>{
    try {
        //find the failed payment 
        const allTransaction = await Transaction.find()

        /* 
        here this is called aggretation is process and analyze data in collection by passing it through
        a series  of stage called pipline
        */
        // const allTransaction = await Transaction.aggregate([
        //     {$match:{type:"deposit",status:"completed"}},
        //     {$group:{_id:"$userId",totamn:{$sum:"$amount"}}},
        //     {$sort:{totamn:-1}},
        // ]);
        res.status(200).send({success:true,data:allTransaction})
    } catch (error) {
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}


module.exports = {createTracnscation,getTranscation}
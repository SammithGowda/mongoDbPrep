const mongoose = require("mongoose")
const Account = require("../schema/accountSchema");

const createAccount = async(req,res)=>{
    const data = req.body;
    try {
        debugger
        const account = await Account.create(data);

        res.status(200).send({success:"Successfully Account Created",data:account})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}
const getAccount = async(req,res)=>{
    try {
        debugger
        // const account = await Account.find().populate("userId")
        //belwo is the aggregation look up for populating data 
        const account = await Account.aggregate([
            {
                $lookup: {
                    from: "users", // Ensure this matches the actual Users collection name
                    let: { userId: "$userId" },//from accounts collection
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", { $toObjectId: "$$userId" }] }
                            }
                        }
                    ],
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Unwind the joined data
            },
            
        ]);
        console.log(account);
        
        res.status(200).send({success:"Successfully retrived Account",data:account})
    } catch (error) {
        console.log(error.message)
        res.status(505).send({
            success: false,
            message: "Internal server error"
          })
    }
}



const deleteAccount = async(req,res)=> {
    const userId = req.params.userId    
    try {
        
    } catch (error) {
        res.status(505).send({
            success: false,
            message: error.message
          })
    }
}



module.exports = {createAccount,getAccount,deleteAccount}
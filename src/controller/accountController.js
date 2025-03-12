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
        const user = await Account.find({userId:"67a4c47ca574ea224b4bc413",accountType:"Business"}).explain("executionStats")
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

// Finds all employees who have a salary greater than 80,000.
// Groups them by department and calculates the average salary in each department.
// Sorts the results in descending order by the average salary.
// {
//   "_id": ObjectId("..."),
//   "name": "John Doe",
//   "position": "Software Engineer",
//   "salary": 90000,
//   "department": "Engineering",
//   "dateOfJoining": ISODate("2020-06-15")
// }
// {
//   "_id": ObjectId("..."),
//   "name": "John Doe",
//   "position": "Software Engineer",
//   "salary": 95000,
//   "department": "Engineering",
//   "dateOfJoining": ISODate("2020-06-15")
// }
// {
//   "_id": ObjectId("..."),
//   "name": "John Doe",
//   "position": "Software Engineer",
//   "salary": 82000,
//   "department": "Engineering",
//   "dateOfJoining": ISODate("2020-06-15")
// }

async function exampleOne(params) {
    const data = await Account.aggregate([
        {$match:{salary:{$gt:80000}}},
        {$group:{_id:"$department",avg:{$avg:"$salary"}}},
        {$sort:{avg:-1}}
    ])
}

// Find the total sales (total quantity * price) for each product.
// Group the sales by product and calculate the total sales for each product across all regions.
// Sort the results by total sales in descending order.
// {
//     "_id": ObjectId("..."),
//     "product": "Laptop",
//     "quantity": 15,
//     "price": 1000,
//     "saleDate": ISODate("2025-02-15"),
//     "region": "North"
//   },
// {
    //     "_id": ObjectId("..."),
    //     "product": "Mobile",
    //     "quantity": 15,
    //     "price": 1000,
    //     "saleDate": ISODate("2025-02-15"),
    //     "region": "North"
    //   }

async function functionTwo(){
    const data = Account.aggregate([
        {$project:{_id:0,product:1,totalSale:{$multiply:["quantity","price"]}}},
        {$group:{_id:"$product",regionSale:{$sum:"$totalSale"}}},
        {$sort:{regionSale:-1}}
    ])
}

module.exports = {createAccount,getAccount,deleteAccount}
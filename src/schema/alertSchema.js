const mongoose = require("mongoose")

const alert = new mongoose.Schema({
transactionId:{type:mongoose.Schema.Types.ObjectId,required:true,},
accountId: {type:mongoose.Schema.Types.ObjectId,required:true,ref:"Account"},
reason: {type:String,required:true,},
flaggedAt:{type:Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("Alert",alert)
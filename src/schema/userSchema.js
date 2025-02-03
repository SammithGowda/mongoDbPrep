const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number,require:true},
    email:{type:String,require:true,unique:true}
},{autoCreate:false,autoIndex:false})


module.exports = mongoose.model("User",User)
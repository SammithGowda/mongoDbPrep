const mongoose = require("mongoose")

const todo = new mongoose.Schema({
    title:{type:String,required:true},
    date:{type:Date,required:true,default:Date.now()}
})

module.exports = mongoose.model("TODO",todo)
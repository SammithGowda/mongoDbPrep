const mongoose = require("mongoose")

const mark = new mongoose.Schema({
    name:{type:String,required:true},
    marks:{type:Number,required:true,}
})

module.exports = mongoose.model("Mark",mark)
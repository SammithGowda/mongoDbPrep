const mongoose = require("mongoose")


const gender = new mongoose.Schema(
  {
    userId: { type: Number, required: true,},
    Gender: { type: String, required: true, },
  },
  { timestamps: true }
);


//creted index for this gender and user schema rest in chatgpt see and impliment
module.exports = mongoose.model("Gender",gender)
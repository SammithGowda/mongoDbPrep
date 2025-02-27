const mongoose = require("mongoose")


const occupationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    occupation: { type: String, required: true, },
  },
  { timestamps: true }
);




module.exports= mongoose.model("Occupation",occupationSchema)
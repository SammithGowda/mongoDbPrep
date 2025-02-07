const mongoose = require("mongoose")


const branch = new mongoose.Schema(
  {
    branchName: { type: String, required: true },
    branchCode: { type: String, required: true, unique: true },
    location: { 
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    },
    contactNumber: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Branch",branch)
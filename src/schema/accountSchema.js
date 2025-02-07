const mongoose = require("mongoose")


const account = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true,},
    accountNumber: { type: String, required: true, unique: true, },
    accountType: { type: String, required: true,enum:["Savings", "Current", "Business"]},
    balance: { type: Number, required: true,min:0},
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Accounts",account)
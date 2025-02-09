const mongoose = require("mongoose")


const account = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true,ref:"User"},
    accountNumber: { type: String, required: true, unique: true, },
    accountType: { type: String, required: true,enum:["Savings", "Current", "Business"]},
    balance: { type: Number, required: true,min:0},
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

account.index({userId:1,accountType:1})

//creted index for this account and user schema rest in chatgpt see and impliment
module.exports = mongoose.model("Accounts",account)
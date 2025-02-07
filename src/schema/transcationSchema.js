const mongoose = require("mongoose")


const transcation = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true }, // Reference to Account
    amount: { type: Number, required: true, min: 0 }, // Transaction amount
    type: { type: String, enum: ["deposit", "withdrawal", "transfer"], required: true }, // Transaction type
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // Transaction status
    transactionDate: { type: Date, default: Date.now }, // Timestamp
    referenceId: { type: String, unique: true, required: true }, // Unique transaction reference ID
    description: { type: String }, // Optional transaction description
  });




module.exports = mongoose.model("Transcation",transcation)
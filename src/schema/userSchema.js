const mongoose = require("mongoose")


const User = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true, unique: true },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    role: { type: String, enum: ["customer", "admin"], default: "customer " },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);




module.exports = mongoose.model("User",User)
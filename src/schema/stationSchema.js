const mongoose = require("mongoose")


const station = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true },
    city: { type: String, required: true },
    state: { type: String, required: true},
    lat: { type: String, required: true, },
    lang: { type: String, required: true, },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Station",station)
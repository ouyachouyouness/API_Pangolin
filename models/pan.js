const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    age: { type: String, trim: true },
    famille: {},
    race: { type: String, trim: true },
    nourriture: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pan", userSchema);

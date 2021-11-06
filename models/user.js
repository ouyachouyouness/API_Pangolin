const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    race: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
    },
    nourriture: {
      type: String,
      trim: true,
    },
    famille: {
      type: Array,
      dafault: [{}],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.cryptPassword(password);
  })

  .get(function () {
    return this._password;
  });

userSchema.methods = {
  cryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHash("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {}
  },
};

module.exports = mongoose.model("User", userSchema);

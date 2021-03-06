const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuid } = require("uuid");

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
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    sitory: {
      type: Array,
      default: [],
    },
    age: { type: String, trim: true },
    famille: {},
    race: { type: String, trim: true },
    nourriture: { type: String, trim: true },
    friends: Array,
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
  authentificate: function (plainText) {
    return this.cryptPassword(plainText) === this.password;
  },

  cryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

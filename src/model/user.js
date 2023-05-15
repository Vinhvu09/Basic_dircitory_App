const express = require("express");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    //unique: true,
    // required: [true, "email require"],
  },
  password: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

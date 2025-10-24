const mongoose = require("mongoose");
const authConnection = require("../../connections/authDb");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = authConnection.model("User", userSchema);

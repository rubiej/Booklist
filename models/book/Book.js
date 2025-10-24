const mongoose = require("mongoose");
const bookConnection = require("../../connections/bookDb");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = bookConnection.model("Book", bookSchema);
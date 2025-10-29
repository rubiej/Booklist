
require("dotenv").config();

const mongoose = require("mongoose");

const bookConnection = mongoose.createConnection(process.env.BOOK_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("📦 BOOK_DB_URI:", process.env.BOOK_DB_URI)

bookConnection.on("connected", () => console.log("✅ Connected to Book DB"));

module.exports = bookConnection;

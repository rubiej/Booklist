require("dotenv").config();

const mongoose = require("mongoose");

const bookConnection = mongoose.createConnection(process.env.BOOK_DB_URI);

bookConnection.on("connected", () => console.log("✅ Connected to Book DB"));

module.exports = bookConnection;


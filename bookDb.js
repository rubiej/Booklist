const mongoose = require("mongoose");

const bookConnection = mongoose.createConnection(process.env.BOOK_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

bookConnection.on("connected", () => console.log("✅ Connected to Book DB"));

module.exports = bookConnection;


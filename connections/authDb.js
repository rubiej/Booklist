const mongoose = require("mongoose");

const authConnection = mongoose.createConnection(process.env.AUTH_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authConnection.on("connected", () => console.log("✅ Connected to Auth DB"));

module.exports = authConnection;
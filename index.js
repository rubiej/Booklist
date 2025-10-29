require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/auth/User");
const bookRoutes = require("./routes/bookRoutes");
const authMiddleware = require("./middleware/auth");

const app = express(); // ✅ Moved this up before using `app`

const allowedOrigins = [
  'http://localhost:3000', // for local dev
  'https://bookauth.vercel.app' // for production
];

// ✅ CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options("*", cors()); // ✅ Add this line

app.use(express.json());

// ✅ Root
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Booklist API");
});

// ✅ Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ message: "Username already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashed });
  await newUser.save();
  res.status(201).json({ message: "User registered" });
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// ✅ Protected book routes
app.use("/api/books", authMiddleware, bookRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

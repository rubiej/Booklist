const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // ✅ Allow preflight requests to pass through
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

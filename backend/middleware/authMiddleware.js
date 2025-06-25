const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes.
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user._id).select("-password"); //Exclude password.
      next();
    } catch (err) {
      console.log("Token verification failed", err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware to check whether the user is an admin
const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};



module.exports = { protect, adminCheck };

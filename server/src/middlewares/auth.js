// src/middlewares/auth.js

import jwt from "jsonwebtoken";

// Middleware function to check if the user is authenticated
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from client:", token); // Log the token received from the client
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded); // Log the decoded token payload
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Middleware function to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Replace 'YOUR_JWT_SECRET' with your actual secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle JWT verification errors appropriately (e.g., expired token, invalid signature)
    return res.status(401).json({ error: "Unauthorized" });
  }
};

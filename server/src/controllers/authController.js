// server/src/controllers/authController.js

import User from "../models/User.js";
import { hashPassword as hashPwd, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

const test = (req, res) => {
  res.json("the test is working");
};

// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    
    if (!email){
      return res.json({
        error: "Email is required",
      })
    }
    
    // Password complexity validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.json({
        error: "Password is required and should be at least 6 characters long with at least one number and one special character",
      });
    }
    
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

    const hashedPassword = await hashPwd(password);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Please enter email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    const tokenPayload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 24 * 60 * 60 * 1000,
          })
          .json({ user, token });
      },
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Logout endpoint
const logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token." });
    }
    res.json(decoded); 
  });
};

export { test, registerUser, loginUser, getProfile, logoutUser };

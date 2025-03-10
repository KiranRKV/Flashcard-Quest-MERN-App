// src/routes/authRoutes.js

import express from "express";
const router = express.Router();
import cors from "cors";
import {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

// Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.get("/logout", logoutUser);
router.get("/profile", authMiddleware, getProfile);

export default router;

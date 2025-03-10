import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile-info", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile/password", authMiddleware, changePassword);

export default router;

import express from "express";
import feedbackController from "../controllers/feedbackController.js";

const router = express.Router();

// Post a message
router.post("/feedback", feedbackController.createFeedback);

// Get all feedback messages (admin page)
router.get("/admin/feedback", feedbackController.getAllFeedback);

export default router;

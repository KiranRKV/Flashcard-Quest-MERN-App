// quizResultRoutes.js

import express from "express";
import {
  saveQuizResult,
  getAllQuizResultsByCategory,
  getAllQuizResultsByUser,
  getUserAnalytics,
  getQuizHistoryByUser,
  getUserQuizResults,
  getCategoryDataForUser,
} from "../controllers/quizResultController.js";

const router = express.Router();

router.post("/quiz-results", saveQuizResult);
router.get("/quiz-results/user/:userId", getAllQuizResultsByUser);
router.get("/quiz-results/category/:categoryId", getAllQuizResultsByCategory);
router.get("/user-analytics/:userId", getUserAnalytics);

// New route for fetching historical quiz data for a user
router.get("/quiz-history/:userId", getQuizHistoryByUser);
router.get("/user-quiz-results/:userId", getUserQuizResults);
router.get("/category-data/:userId", getCategoryDataForUser);

export default router;

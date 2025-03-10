import express from "express";
import {
  createCategory,
  createQuestion,
  getAllCategories,
  getQuestionsByCategory,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/quizController.js";

const router = express.Router();

// Category Routes
router.post("/quizcategories", createCategory);
router.get("/quizcategories", getAllCategories);

// Question Routes
router.post("/questions", createQuestion);
router.get("/questions", getQuestionsByCategory);
router.get("/questions/:id", getQuestionById);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

export default router;

// flashcardRoutes.js

import express from "express";
const router = express.Router();
import {
  getAllFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getFlashcardById,
  editFlashcard,
} from "../controllers/flashcardController.js";

// Define routes for flashcard management
router.get(
  "/flashcards/category/:category/subcategory/:subcategory",
  getAllFlashcards,
);
router.post("/flashcards", createFlashcard);
router.put("/flashcards/:id", updateFlashcard);
router.delete("/flashcards/:id", deleteFlashcard);
router.get("/flashcards/:id", getFlashcardById);
router.put("/flashcards/:id", editFlashcard);

export default router;

// flashcardController.js

import Flashcard from "../models/flashcardModel.js";

// Create Flashcard Controller Function
export const createFlashcard = async (req, res) => {
  try {
    const { question, answer, category, subcategory } = req.body;

    // Create a new Flashcard instance with all the fields
    const flashcard = new Flashcard({
      question,
      answer,
      category,
      subcategory,
    });

    // Save the flashcard to the database
    await flashcard.save();
    res.status(201).json({ flashcard });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Flashcard Controller Function
export const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true },
    );
    res.json({ flashcard: updatedFlashcard });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Flashcard Controller Function
export const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    await Flashcard.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get flashcards by category and subcategory
export const getAllFlashcards = async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const flashcards = await Flashcard.find({ category, subcategory })
      .populate("category")
      .populate("subcategory");
    res.json({ flashcards });
  } catch (error) {
    console.error(
      "Error fetching flashcards by category and subcategory:",
      error,
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit Flashcard Controller Function
export const editFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true },
    );
    res.json({ flashcard: updatedFlashcard });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Flashcard by ID Controller Function
export const getFlashcardById = async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }
    res.json({ flashcard });
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

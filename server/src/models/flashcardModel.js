// models/flashcardModel.js

import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  // Add more fields as needed
});

export default mongoose.model("Flashcard", flashcardSchema);

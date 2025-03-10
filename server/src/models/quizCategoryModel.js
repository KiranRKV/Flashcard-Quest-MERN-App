// src/models/quizCategoryModel.js

import mongoose from "mongoose";

const quizCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Additional fields as necessary
});

export default mongoose.model("QuizCategory", quizCategorySchema);

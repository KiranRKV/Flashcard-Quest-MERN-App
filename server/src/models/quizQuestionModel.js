// src/models/quizQuestionModel.js

import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizCategory",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;

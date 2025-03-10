// server/src/models/quizResultModel.js

import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizCategory",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  incorrectAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

export default QuizResult;

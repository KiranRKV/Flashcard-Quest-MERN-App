// server/src/controllers/quizResultController.js

import QuizResult from "../models/quizResultModel.js";
import jwt from "jsonwebtoken";

// Controller function to save quiz result
export const saveQuizResult = async (req, res) => {
  const { userId, categoryId, score, totalQuestions, userAnswers } = req.body;
  try {
    const newQuizResult = new QuizResult({
      user: userId,
      category: categoryId,
      score,
      totalQuestions,
      correctAnswers: [],
      incorrectAnswers: [],
    });
    const savedResult = await newQuizResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get quiz results for a specific user
export const getAllQuizResultsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const quizResults = await QuizResult.find({ user: userId })
      .populate("category", "name")
      .populate("correctAnswers", "questionText")
      .populate("incorrectAnswers", "questionText");
    res.json(quizResults);
  } catch (error) {
    console.error("Error retrieving quiz results by user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get quiz results for a specific category
export const getAllQuizResultsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const quizResults = await QuizResult.find({ category: categoryId })
      .populate("user", "name email")
      .populate("correctAnswers", "questionText")
      .populate("incorrectAnswers", "questionText");
    res.json(quizResults);
  } catch (error) {
    console.error("Error retrieving quiz results by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get user analytics
export const getUserAnalytics = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const quizResults = await QuizResult.find({ user: userId });
    const totalQuizzesCompleted = quizResults.length;
    let averageScore = 0;
    if (totalQuizzesCompleted > 0) {
      averageScore =
        quizResults.reduce((acc, curr) => acc + curr.score, 0) /
        totalQuizzesCompleted;
    }
    res.json({
      name: decodedToken.name,
      email: decodedToken.email,
      totalQuizzesCompleted,
      averageScore,
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const getQuizHistoryByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Query the database to fetch historical quiz data for the user
    const quizHistory = await QuizResult.find({ user: userId })
      .populate("category")
      .exec();
    res.json(quizHistory);
  } catch (error) {
    console.error("Error retrieving quiz history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserQuizResults = async (req, res) => {
  const { userId } = req.params;
  try {
    const quizResults = await QuizResult.find({ user: userId });

    // Group quiz results by category and calculate scores
    const categoryScores = quizResults.reduce((acc, result) => {
      const category = result.category.id || result.category; // Handle cases where category might not have an ID
      const existingCategory = acc.find((c) => c._id === category);
      if (existingCategory) {
        existingCategory.scores.push(result.score);
      } else {
        acc.push({
          _id: category,
          category: result.category.name || "Uncategorized", // Handle cases where category might not have a name
          scores: [result.score],
        });
      }
      return acc;
    }, []);

    // Format data with category and individual quiz scores
    const formattedData = categoryScores.map((category) => {
      const quizScores = category.scores.map((score) => ({ score })); // Wrap each score in an object
      return { category: category.category, quizScores };
    });

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching user quiz results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryDataForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const quizResults = await QuizResult.find({ user: userId }).populate(
      "category",
    );

    // Calculate min, avg, and max scores for each category
    const categoryData = quizResults.reduce((acc, result) => {
      const category = result.category.name || "Uncategorized"; // Handle cases where category might not have a name
      const score = result.score;
      if (!acc[category]) {
        acc[category] = {
          minScore: score,
          maxScore: score,
          totalScore: score,
          count: 1,
        };
      } else {
        acc[category].minScore = Math.min(acc[category].minScore, score);
        acc[category].maxScore = Math.max(acc[category].maxScore, score);
        acc[category].totalScore += score;
        acc[category].count++;
      }
      return acc;
    }, {});

    // Calculate average score for each category
    for (let category in categoryData) {
      categoryData[category].avgScore =
        categoryData[category].totalScore / categoryData[category].count;
    }

    res.json(categoryData);
  } catch (error) {
    console.error("Error retrieving category data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

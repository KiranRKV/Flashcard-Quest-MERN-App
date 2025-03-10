import Category from "../models/quizCategoryModel.js";
import Question from "../models/quizQuestionModel.js";
import QuizResult from "../models/quizResultModel.js";

// Create a new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({
      name,
      description,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  const { category, questionText, options, correctAnswer } = req.body;
  try {
    const question = new Question({
      category,
      questionText,
      options,
      correctAnswer,
    });
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get questions by category
export const getQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const questions = await Question.find({ category: categoryId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswer } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, options, correctAnswer },
      { new: true },
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save quiz result
export const saveQuizResult = async (req, res) => {
  const { userId, categoryId, score, totalQuestions, userAnswers } = req.body;
  try {
    const newQuizResult = new QuizResult({
      userId,
      category: categoryId,
      score,
      totalQuestions,
      userAnswers,
    });
    const savedResult = await newQuizResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

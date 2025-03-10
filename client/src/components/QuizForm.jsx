import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const QuizForm = ({ quizToEdit }) => {
  const [categories, setCategories] = useState([]);
  const [quizData, setQuizData] = useState({
    category: "",
    questionText: "",
    options: ["", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/quizcategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();

    if (quizToEdit) {
      setQuizData({
        category: quizToEdit.category,
        questionText: quizToEdit.questionText,
        options: quizToEdit.options,
        correctAnswer: quizToEdit.correctAnswer,
      });
    }
  }, [quizToEdit]);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (name === "options") {
      const options = [...quizData.options];
      options[dataset.id] = value;
      setQuizData({ ...quizData, options });
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !quizData.category ||
      quizData.questionText === "" ||
      quizData.correctAnswer === ""
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("/api/questions", quizData);
      toast.success("Quiz saved successfully!");
      console.log("Quiz saved successfully:", response.data);
      setCategories([]);
      setQuizData({
        category: "",
        questionText: "",
        options: ["", "", ""],
        correctAnswer: "",
      })
    } catch (error) {
      console.error("Error saving quiz:", error);
      toast.error("Error saving quiz.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto my-10"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Create Quiz</h2>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          name="category"
          value={quizData.category}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="questionText"
          className="block text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <input
          type="text"
          name="questionText"
          value={quizData.questionText}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {quizData.options.map((option, index) => (
        <div key={`option-${index}`} className="mb-4">
          <label
            htmlFor={`option-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Option {index + 1}
          </label>
          <input
            key={`input-option-${index}`}
            type="text"
            name="options"
            data-id={index}
            value={option}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}
      <div className="mb-6">
        <label
          htmlFor="correctAnswer"
          className="block text-sm font-medium text-gray-700"
        >
          Answer
        </label>
        <input
          type="text"
          name="correctAnswer"
          value={quizData.correctAnswer}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Quiz
      </button>
    </form>
  );
};

export default QuizForm;
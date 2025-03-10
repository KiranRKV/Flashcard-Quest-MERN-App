import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const FlashcardForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("/api/subcategories");
        setSubcategories(response.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Filter subcategories based on the selected category
    const filteredSubcategories = subcategories.filter(
      (sub) => sub.category === e.target.value,
    );
    setSubcategories(filteredSubcategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/flashcards", {
        question,
        answer,
        category,
        subcategory,
      });
      console.log("Flashcard created:", response.data.flashcard);
      // Display success toast message
      toast.success("Flashcard created successfully!");
      // Reset form fields
      setQuestion("");
      setAnswer("");
      setCategory("");
      setSubcategory("");
    } catch (error) {
      console.error("Error creating flashcard:", error);
      // Display error toast message
      toast.error("Failed to create flashcard. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-96px)] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-[35rem] p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create Flashcard
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium"
            >
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="subcategory"
              className="block text-gray-700 font-medium"
            >
              Subcategory:
            </label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="question"
              className="block text-gray-700 font-medium"
            >
              Question:
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="answer" className="block text-gray-700 font-medium">
              Answer:
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Create Flashcard
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;

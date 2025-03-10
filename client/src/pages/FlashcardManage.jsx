import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    try {
      const response = await axios.get(
        `/api/subcategories?category=${categoryId}`,
      );
      setSubcategories(response.data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubcategoryChange = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    try {
      const response = await axios.get(
        `/api/flashcards/category/${selectedCategory}/subcategory/${subcategoryId}`,
      );
      setFlashcards(response.data.flashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory,
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/flashcards/${id}`);
      // Update flashcards state after deletion
      setFlashcards(flashcards.filter((flashcard) => flashcard._id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Flashcards
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
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
              className="block text-gray-700 font-medium mb-2"
            >
              Subcategory:
            </label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">Select Subcategory</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Flashcards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcards.map((flashcard) => (
              <div
                key={flashcard._id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    Question: {flashcard.question}
                  </div>
                  <div className="text-gray-700">
                    Answer: {flashcard.answer}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    to={`/edit/${flashcard._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(flashcard._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

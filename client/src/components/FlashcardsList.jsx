import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlashcardsList.css";
import { toast } from "react-hot-toast";

const FlashcardsList = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFlashcards, setShowFlashcards] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      const filteredSubcategories = response.data.subcategories.filter(
        (subcategory) => subcategory.category === categoryId,
      );
      setSubcategories(filteredSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubcategoryChange = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleStartFlashcards = async () => {
    try {
      const response = await axios.get(
        `/api/flashcards/category/${selectedCategory}/subcategory/${selectedSubcategory}`,
      );
      setFlashcards(
        response.data.flashcards.map((flashcard) => ({
          ...flashcard,
          showAnswer: false,
        })),
      );
      setCurrentCardIndex(0);
      setShowFlashcards(true);
      toast.success("Flashcards started!");
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleEndFlashcards = () => {
    setShowFlashcards(false);
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSubcategories([]);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length,
    );
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-gray-100 flex items-center justify-center">
      <div className="container min-h-[500px] max-w-[900px] flex flex-col items-center py-8 bg-white rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Flashcards</h2>
        {!showFlashcards && (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <div>
              <label
                htmlFor="category"
                className="block font-semibold mb-2 text-gray-700"
              >
                Category:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div>
                <label
                  htmlFor="subcategory"
                  className="block font-semibold mb-2 text-gray-700"
                >
                  Subcategory:
                </label>
                <select
                  id="subcategory"
                  value={selectedSubcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCategory && selectedSubcategory && (
                <button
                  className="mt-3 sm:mt-7 sm:ml-4 w-[120px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleStartFlashcards}
                >
                  Start
                </button>
              )}
            </div>
          </div>
        )}
        {showFlashcards && (
          <div className="bg-b rounded-lg shadow-md py-8 px-6 mt-8">
            <div className="FlashcardWrapper">
              <div className="FlashcardWrapper__item shadow-lg">
                <div className="FlashcardWrapper__item--front">
                  <p className="text-xl font-semibold text-center text-gray-800">
                    {flashcards[currentCardIndex].question}
                  </p>
                </div>
                <div className="FlashcardWrapper__item--back">
                  <p className="text-xl font-semibold text-center text-gray-800">
                    {flashcards[currentCardIndex].answer}
                  </p>
                </div>
              </div>
            </div>
            {flashcards.length > 1 && (
              <div className="flex justify-between pt-10 max-w-[500px] mx-auto">
                <button
                  className="text-blue-500 hover:text-blue-600 w-[80px] "
                  onClick={handlePreviousCard}
                >
                  Previous
                </button>
                <p className="rounded-md px-4 py-2 font-semibold">
                  {currentCardIndex + 1}/{flashcards.length}
                </p>
                <button
                  className="text-blue-500 hover:text-blue-600 w-[80px]"
                  onClick={handleNextCard}
                >
                  Next
                </button>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
                onClick={handleEndFlashcards}
              >
                End
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsList;

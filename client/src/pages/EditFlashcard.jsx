// EditFlashcard.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditFlashcard = () => {
  const { id } = useParams(); // Get the flashcard ID from the URL params
  const [flashcard, setFlashcard] = useState({ question: "", answer: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const response = await axios.get(`/api/flashcards/${id}`); // Fetch the flashcard data by ID
        setFlashcard(response.data.flashcard);
      } catch (error) {
        console.error("Error fetching flashcard:", error);
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlashcard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/flashcards/${id}`, flashcard); 
      toast.success("Flashcard updated successfully!");
      navigate("/flashcardmanage");
    } catch (error) {
      console.error("Error updating flashcard:", error);
      toast.error("Error updating flashcard. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Edit Flashcard</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 font-bold mb-2"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={flashcard.question}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-gray-700 font-bold mb-2"
          >
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={flashcard.answer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditFlashcard;

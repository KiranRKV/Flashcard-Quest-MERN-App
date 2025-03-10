// CategoryForm.jsx

import React, { useState } from "react";
import {toast} from 'react-hot-toast'

const CategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!categoryName || !description) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const categoryData = {
        name: categoryName,
        description: description,
      };
      await onSubmit(categoryData);
      toast.success("Category created successfully!")
      // Clear form fields after successful submission
      setCategoryName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating category:", error);
      setError(error);
      toast.error("Failed to create category. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-96px)] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Category
        </h2>
        <div className="mb-6">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 font-medium mb-2"
          >
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          ></textarea>
        </div>
        {error && (
          <p className="text-red-500 mb-4">
            {error.message || "An error occurred"}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;

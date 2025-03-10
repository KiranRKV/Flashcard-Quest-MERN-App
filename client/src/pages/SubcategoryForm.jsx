import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SubcategoryForm = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedCategory || !subcategoryName || !description) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const subcategoryData = {
        categoryId: selectedCategory,
        name: subcategoryName,
        description: description,
      };
      await onSubmit(subcategoryData);
      toast.success("Subcategory created successfully!")
      // Clear form fields after successful submission
      setSelectedCategory("");
      setSubcategoryName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setError(error);
      toast.error("Failed to create subcategory. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-96px)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Subcategory
        </h2>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
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
        <div className="mb-6">
          <label
            htmlFor="subcategoryName"
            className="block text-gray-700 font-medium mb-2"
          >
            Subcategory Name:
          </label>
          <input
            type="text"
            id="subcategoryName"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
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

export default SubcategoryForm;

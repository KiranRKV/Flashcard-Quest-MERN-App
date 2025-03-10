import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace '/api/quizcategories' with your actual endpoint to create a category
      const response = await axios.post("/api/quizcategories", formData);
      console.log("Category created successfully:", response.data);
      toast.success("Category created successfully!");
      // Optionally reset form or redirect user
      setFormData({ name: "", description: "" });
      // Redirect or update UI as needed
    } catch (error) {
      console.error(
        "Error creating category:",
        error.response?.data?.message || error.message,      
      );
      toast.error("Failed to create category. Please try again.");
      // Handle errors (e.g., display error messages to user)
    }
  };

  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit}
        className=" max-w-lg mx-auto my-10 p-5 shadow-lg rounded bg-white"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Create Category
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;

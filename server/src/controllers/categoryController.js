// controllers/categoryController.js

import Category from "../models/categoryModel.js";

// controllers/categoryController.js

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Category with this name already exists" });
    }
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required fields" });
    }

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message,
      );
      res.status(400).json({ error: validationErrors });
    } else if (error.code === 11000) {
      res.status(400).json({ error: "Category with this name already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

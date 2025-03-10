// controllers/subcategoryController.js

import Subcategory from "../models/subcategoryModel.js";
import Category from "../models/categoryModel.js";

// Controller function to create a new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId, description } = req.body;

    if (!name || !categoryId || !description) {
      return res
        .status(400)
        .json({
          error: "Name, categoryId, and description are required fields",
        });
    }

    // Check if the referenced category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ error: "Referenced category does not exist" });
    }

    // Create the subcategory
    const subcategory = new Subcategory({
      name,
      category: categoryId,
      description,
    });
    await subcategory.save();

    res.status(201).json({ subcategory });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ error: error.message || "Internal server error" }); // Provide more specific error message
  }
};

// Controller function to get all subcategories
export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.json({ subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// models/subcategoryModel.js

import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

export default mongoose.model("Subcategory", subcategorySchema);

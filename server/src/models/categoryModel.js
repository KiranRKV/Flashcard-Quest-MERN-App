// models/categoryModel.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, // Add required: true here
  },
  // Add more fields as needed
});

export default mongoose.model("Category", categorySchema);

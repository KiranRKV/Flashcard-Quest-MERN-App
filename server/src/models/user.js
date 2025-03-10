// models/user.js

import mongoose from "mongoose";
const { Schema } = mongoose;

// Check if the model already exists
const UserModel =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user", // Default role is 'user'
      },
    }),
  );

export default UserModel;

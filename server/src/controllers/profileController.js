// controllers/userController.js
import User from "../models/User.js";
import { hashPassword as hashPwd, comparePassword } from "../helpers/auth.js";

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user profile
// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const hashedPassword = await hashPwd(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// routes/categoryRoutes.js

import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);

export default router;

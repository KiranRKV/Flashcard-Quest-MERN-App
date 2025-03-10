// routes/subcategoryRoutes.js

import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
} from "../controllers/subcategoryController.js";

const router = express.Router();

router.post("/subcategories", createSubcategory);

router.get("/subcategories", getAllSubcategories);

export default router;

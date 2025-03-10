import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js"; 
import categoryRoutes from "./routes/categoryRoutes.js"; 
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import feedbackRoutes from "./routes/feedbackRoute.js";
import QuizResultRoutes from "./routes/quizResultRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

// Define CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", 
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Mount flashcard, category, and subcategory routes
app.use("/api", authRoutes);
app.use("/api", flashcardRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", quizRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", QuizResultRoutes);
app.use("/api", profileRoutes);

// Handle CORS for the '/profile' route
app.options("/profile", cors(corsOptions));
app.get("/profile", cors(corsOptions), (req, res) => {
});


export { app };

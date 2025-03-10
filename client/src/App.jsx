// App.jsx

import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import FlashcardsList from "./components/FlashcardsList";
import FlashcardForm from "./pages/FlashcardForm";
import FlashcardManage from "./pages/FlashcardManage";
import CategoryForm from "./pages/CategoryForm";
import SubcategoryForm from "./pages/SubcategoryForm";
import EditFlashcard from "./pages/EditFlashcard";
import QuizForm from "./components/QuizForm";
import QuizList from "./components/QuizList";
import QuizCategoryForm from "./components/quizCategoryForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { RequireAdmin, RequireUser } from "./components/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import AdminLayout from "./components/AdminLayout";
import FeedbackAdminPage from "./components/FeedbackAdminPage";
import UserDashboard from "./components/UserDashboard";
import Profile from "./components/Profile";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const handleSubmitCategory = async (formData) => {
    try {
      // Make API request to submit category form
      const response = await axios.post("/api/categories", formData);
      console.log("Category created:", response.data.category);
    } catch (error) {
      console.error("Error submitting category form:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleSubmitSubcategory = async (formData) => {
    try {
      // Make API request to submit subcategory form
      const response = await axios.post("/api/subcategories", formData);
      console.log("Subcategory created:", response.data.subcategory);
    } catch (error) {
      console.error("Error submitting subcategory form:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleSubmitQuiz = async (quizData) => {
    console.log("quizData.categoryId:", quizData.categoryId); // Add this line to check the value
    try {
      const response = await axios.post("/api/questions", {
        category: quizData.categoryId, // Assign quizData.categoryId directly
        questionText: quizData.question,
        options: quizData.options,
        correctAnswer: quizData.answer,
      });
      console.log("Quiz created:", response.data);
      // Optionally, redirect the user or show a success message
    } catch (error) {
      console.error("Error submitting quiz:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAdmin>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/flashcards"
          element={
            <RequireUser>
              <FlashcardsList />
            </RequireUser>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RequireAdmin>
              <AdminLayout>
                <EditFlashcard />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAdmin>
              <AdminLayout>
                <FlashcardForm />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/flashcardmanage"
          element={
            <RequireAdmin>
              <AdminLayout>
                <FlashcardManage />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/category"
          element={
            <RequireAdmin>
              <AdminLayout>
                <CategoryForm onSubmit={handleSubmitCategory} />
              </AdminLayout>
            </RequireAdmin>
          }
        />{" "}
        // Pass handleSubmitCategory to CategoryForm
        <Route
          path="/subcategory"
          element={
            <RequireAdmin>
              <AdminLayout>
                <SubcategoryForm onSubmit={handleSubmitSubcategory} />
              </AdminLayout>
            </RequireAdmin>
          }
        />{" "}
        // Pass handleSubmitSubcategory to SubcategoryForm
        <Route
          path="/quizlist"
          element={
            <RequireUser>
              <QuizList />
            </RequireUser>
          }
        />
        <Route
          path="/quizcategory"
          element={
            <RequireAdmin>
              <AdminLayout>
                <QuizCategoryForm />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/quiz"
          element={
            <RequireAdmin>
              <AdminLayout>
                <QuizForm onSubmit={handleSubmitQuiz} />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/feedback"
          element={
            <RequireAdmin>
              <AdminLayout>
                <FeedbackAdminPage />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <RequireUser>
              <UserDashboard />
            </RequireUser>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireUser>
              <Profile />
            </RequireUser>
          }
        />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}

export default App;

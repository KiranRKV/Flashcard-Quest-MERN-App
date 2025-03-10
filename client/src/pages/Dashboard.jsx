import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  window.scrollTo(0, 0);
  return (
    <div>
      <div className="flex">
        <div className="container mx-auto px-4 py-8 h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/create"
            className="card bg-blue-500 hover:bg-blue-600 text-white shadow rounded p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold mb-2">Create Flashcard</h3>
            <p className="text-sm">Add new flashcards to your database.</p>
          </Link>
          <Link
            to="/category"
            className="card bg-green-500 hover:bg-green-600 text-white shadow rounded p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold mb-2">Create Category</h3>
            <p className="text-sm">Organize flashcards by category.</p>
          </Link>
          <Link
            to="/subcategory"
            className="card bg-orange-500 hover:bg-orange-600 text-white shadow rounded p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold mb-2">Create Subcategory</h3>
            <p className="text-sm">Further categorize flashcards.</p>
          </Link>
          <Link
            to="/flashcardmanage"
            className="card bg-red-500 hover:bg-red-600 text-white shadow rounded p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold mb-2">Manage Flashcards</h3>
            <p className="text-sm">Access advanced admin features.</p>
          </Link>
          <Link
            to="/quizcategory"
            className="card bg-purple-500 hover:bg-purple-600 text-white shadow rounded p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold mb-2">Quiz Categories</h3>
            <p className="text-sm">Manage categories for quizzes.</p>
          </Link>
          <Link
            to="/quiz"
            className="card bg-indigo-500 hover:bg-indigo-600 text-white shadow rounded p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold mb-2">Create Quiz</h3>
            <p className="text-sm">Build quizzes for your users.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

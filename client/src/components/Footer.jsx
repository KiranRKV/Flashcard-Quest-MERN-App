import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logonew.png";

export default function Footer() {
  return (
    <footer className="bg-white shadow-lg ">
      <div className="max-w-[1240px] mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src={logo} alt="logo" className="w-32 mb-4" />
          <p className="text-gray-500 font-mono">
            Empowering learners with interactive flashcards and quiz.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-[#0099ff] font-mono uppercase">
            Links
          </h4>
          <Link
            to="/"
            className="text-gray-500 font-mono hover:text-[#0099ff] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-500 font-mono hover:text-[#0099ff] transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-500 font-mono hover:text-[#0099ff] transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/flashcards"
            className="text-gray-500 font-mono hover:text-[#0099ff] transition-colors"
          >
            Flashcards
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-[#0099ff] font-mono uppercase">
            Book Recommendations
          </h4>
          <p className="text-gray-500 font-mono">
            Discover insightful books to deepen your knowledge.
          </p>
          <a
            className="text-gray-500 font-mono hover:text-[#0099ff] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Atomic Habits by James Clear
          </a>
          <a
            className="text-gray-500 font-mono hover:text-[#0099ff] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sapiens: A Brief History of Humankind by Yuval Noah Harari
          </a>
        </div>
      </div>
      <div className="bg-[#0099ff] text-white text-center py-4 font-mono">
        &copy; {new Date().getFullYear()} Flashcard Quest. All rights reserved.
      </div>
    </footer>
  );
}

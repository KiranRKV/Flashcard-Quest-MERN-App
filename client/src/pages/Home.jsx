import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { toast } from "react-hot-toast";
import BgImg from "../assets/bg1.jpg";
import BgImg2 from "../assets/bg5.jpg";

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleExploreFlashcards = () => {
    if (!user) {
      toast.error("Please login to explore flashcards");
      navigate("/login");
    } else {
      navigate("/flashcards");
    }
  };

  const handleExploreQuiz = () => {
    if (!user) {
      toast.error("Please login to explore quizzes");
      navigate("/login");
    } else {
      navigate("/quizlist");
    }
  };

  return (
    <>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white text-center px-4">
              <h2 className="mb-4 text-4xl font-semibold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0099ff] shadow-500">
                Learning Made Easy
              </h2>
              <h4 className="mb-6 text-xl font-semibold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black shadow-500">
                Dive into a wide array of interactive flashcards and quizzes to
                enhance your knowledge.
              </h4>
              <button
                className="inline-block rounded border-2 border-white px-7 py-3 text-sm font-medium uppercase transition duration-150 ease-in-out hover:bg-white hover:text-[#0099ff] focus:outline-none focus:ring-0"
                onClick={() => (window.location.href = "/#cards")}
              >
                Start Learning Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="cards"
        className="py-12 min-h-screen bg-cover bg-no-repeat relative overflow-hidden flex items-center justify-center cursor-default"
        style={{ backgroundImage: `url(${BgImg2})` }}
      >
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-[#0099ff] to-[#66b3ff] rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Flashcards</h3>
            <p className="text-gray-300 mb-6">
              Dive into our interactive flashcard collection to enhance your
              knowledge.
            </p>
            <button
              onClick={handleExploreFlashcards}
              className="inline-block rounded border-2 border-white px-7 py-3 text-sm font-medium uppercase transition duration-150 ease-in-out hover:bg-white hover:text-[#0099ff] focus:outline-none focus:ring-0"
            >
              Explore Flashcards
            </button>
          </div>
          <div className="bg-gradient-to-r from-[#0099ff] to-[#66b3ff] rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Quizzes</h3>
            <p className="text-gray-300 mb-6">
              Test your knowledge with our engaging quizzes and assessments.
            </p>
            <button
              onClick={handleExploreQuiz}
              className="inline-block rounded border-2 border-white px-7 py-3 text-sm font-medium uppercase transition duration-150 ease-in-out hover:bg-white hover:text-[#0099ff] focus:outline-none focus:ring-0"
            >
              Take a Quiz
            </button>
          </div>
          <div className="bg-gradient-to-r from-[#0099ff] to-[#66b3ff] rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">About</h3>
            <p className="text-gray-300 mb-6">
              Learn more about our company and the mission behind Flashcard
              Quest.
            </p>
            <Link
              to="/about"
              className="inline-block rounded border-2 border-white px-7 py-3 text-sm font-medium uppercase transition duration-150 ease-in-out hover:bg-white hover:text-[#0099ff] focus:outline-none focus:ring-0"
            >
              Discover More
            </Link>
          </div>
          {user && (
            <>
              <div className="bg-gradient-to-r from-[#0099ff] to-[#66b3ff] rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  User Dashboard
                </h3>
                <p className="text-gray-300 mb-6">
                  Access your personalized dashboard with all your study
                  materials and progress.
                </p>
                <Link
                  to="/userdashboard"
                  className="inline-block rounded border-2 border-white px-7 py-3 text-sm font-medium uppercase transition duration-150 ease-in-out hover:bg-white hover:text-[#0099ff] focus:outline-none focus:ring-0"
                >
                  Go to Dashboard
                </Link>
              </div>
              <div className="bg-gradient-to-r from-[#0099ff] to-[#66b3ff] rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-white">Profile</h3>
                <p className="text-gray-300 mb-6">
                  Manage your profile settings and preferences.
                </p>
                <Link
                  to="/profile"
                  className="inline-block rounded border-2 border-white px-7 py-3 text-sm font-medium uppercase transition duration-150 ease-in-out hover:bg-white hover:text-[#0099ff] focus:outline-none focus:ring-0"
                >
                  Go to Profile
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

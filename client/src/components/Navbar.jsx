import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { CircleUserRound } from "lucide-react";
import logo from "../assets/logonew.png";


export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      setUser(null);
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-[#0099ff] font-mono">
        <Link to="/">
        <img src={logo} alt="Logo" className=" w-[180px]"  />
        </Link>
        <div className="md:flex items-center space-x-4 hidden uppercase ">
          <Link className="p-4 hover:text-primary-600" to="/about">
            About
          </Link>
          <Link className="p-4 hover:text-primary-600" to="/contact">
            Contact
          </Link>
          {user && (
            <>
              <Link className="p-4 hover:text-primary-600" to="/flashcards">
                Flashcards
              </Link>
              <Link className="p-4 hover:text-primary-600" to="/quizlist">
                Quiz
              </Link>
              <Link to="/profile" className="flex items-center space-x-4">
                <CircleUserRound className="h-6 w-6 text-[#0099ff] hover:text-primary-600 transition duration-300 ease-in-out" />
              </Link>
            </>
          )}
          <div className="p-4 ml-auto">
            {user ? (
              <button
                className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  className="rounded border-2 border-[#0099ff] px-6 pb-[6px] pt-2 font-semibold uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 w-32"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="ml-4 mt-4 rounded bg-[#0099ff] px-6 pb-2 pt-2.5 font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] w-32"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center justify-end">
          {isMenuOpen ? (
            <button
              className="text-[#0099ff] focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              className="text-[#0099ff] focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          <div
            className={`nav-menu ${isMenuOpen ? "" : "hidden"} absolute right-0 top-24 bg-white shadow-lg p-4 rounded-b-lg w-full`}
          >
            <Link
              className="block p-2 uppercase hover:text-primary-600"
              to="/about"
            >
              About
            </Link>
            <Link
              className="block p-2 uppercase hover:text-primary-600"
              to="/contact"
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  className="block p-2 uppercase hover:text-primary-600"
                  to="/flashcards"
                >
                  Flashcards
                </Link>
                <Link
                  className="block p-2 uppercase hover:text-primary-600"
                  to="/quiz"
                >
                  Quiz
                </Link>
                <Link
                  className="block p-2 uppercase hover:text-primary-600"
                  to="/profile"
                >
                  Profile
                </Link>
              </>
            )}
            <div className="p-2">
              {user ? (
                <button
                  className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    className="block rounded border-2 border-[#0099ff] px-6 pb-[6px] pt-2 font-semibold uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="block mt-4 rounded bg-[#0099ff] px-6 pb-2 pt-2.5 font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

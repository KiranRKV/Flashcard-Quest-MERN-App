import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [quizHistory, setQuizHistory] = useState([]);
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        if (user && user._id && authToken) {
          // Fetch user analytics
          const analyticsResponse = await axios.get(
            `/api/user-analytics/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          setUserAnalytics(analyticsResponse.data);

          // Fetch quiz history
          const historyResponse = await axios.get(
            `/api/quiz-history/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          setQuizHistory(historyResponse.data);

          // Fetch category data
          const categoryDataResponse = await axios.get(
            `/api/category-data/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          setCategoryData(categoryDataResponse.data);
          console.log(categoryDataResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleViewHistory = () => {
    setShowHistoryPage(true);
  };

  const handleBackToDashboard = () => {
    setShowHistoryPage(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (showHistoryPage) {
    return (
      <div className="w-full mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 to-purple-400">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Historical Quiz Data
          </h1>
          <button
            className="text-white hover:text-gray-300 transition-colors duration-300"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
        {quizHistory.length === 0 ? (
          <p className="text-white">No quiz history available.</p>
        ) : (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <ul>
              {quizHistory.map((quizResult, index) => (
                <li key={index} className="mb-2">
                  <div className="bg-gray-100 p-2 md:p-4 rounded-md">
                    <p className="font-bold">Date: {quizResult.createdAt}</p>
                    <p>Category: {quizResult.category.name}</p>
                    <p>Score: {quizResult.score}</p>
                    <p>Total Questions: {quizResult.totalQuestions}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Transform categoryData object into an array of objects
  const transformedCategoryData = Object.entries(categoryData).map(
    ([category, data]) => ({
      category,
      ...data,
    }),
  );

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 to-purple-400">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        User Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          {userAnalytics && (
            <>
              <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-purple-600">
                User Analytics
              </h2>
              <p className="mb-1">Name: {userAnalytics.name}</p>
              <p className="mb-1">Email: {userAnalytics.email}</p>
              <p className="mb-1">
                Total Quizzes Completed: {userAnalytics.totalQuizzesCompleted}
              </p>
              <p className="mb-1">
                Average Score: {userAnalytics.averageScore.toFixed(2)}
              </p>
            </>
          )}
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-pink-600 flex items-center">
              <FaHistory className="text-pink-600 mr-2" />
              Historical Quiz Data
            </h2>
            <p
              onClick={handleViewHistory}
              className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
            >
              View Full History
            </p>
          </div>
          <div className="mt-4 text-center">
            <button>
              <FaHistory
                className="text-pink-600 text-6xl"
                onClick={handleViewHistory}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-purple-600">
            Progress Over Time
          </h2>
          <div className="w-full h-96 md:h-full">
            <LineChart quizHistory={quizHistory} />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-pink-600">
            Category Performance Range
          </h2>
          <div className="w-full h-96 md:h-full">
            <BarChart categoryData={transformedCategoryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

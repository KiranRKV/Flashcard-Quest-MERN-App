import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/userContext";

const QuizPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxQuestions] = useState(10);
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/quizcategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!categoryId || !quizStarted) return;
    setLoading(true);
    setError(null);
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `/api/questions?categoryId=${categoryId}`,
        );
        const randomQuestions = shuffleArray(response.data).slice(
          0,
          maxQuestions,
        );
        setQuestions(randomQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(maxQuestions).fill(null));
        setShowResults(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [categoryId, quizStarted, maxQuestions]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    toast.success("Quiz started!");
  };

  const handleAnswer = (option, index) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[index] = option;
    setUserAnswers(updatedUserAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questions ? questions.length - 1 : 0)) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    toast.success("Quiz completed!");
    const score = userAnswers.reduce(
      (acc, answer, index) =>
        acc + (answer === questions[index].correctAnswer ? 1 : 0),
      0,
    );
    saveQuizResult(score); // Pass the calculated score as an argument
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCategoryId("");
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuestions(null);
  };

  async function saveQuizResult(score) {
    try {
      const response = await axios.post("/api/quiz-results", {
        userId: user._id,
        categoryId: categoryId,
        score: score,
        totalQuestions: questions.length,
        userAnswers: userAnswers,
      });
      console.log("Quiz result saved:", response.data);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  }

  const renderSelectionScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-96px)] bg-gradient-to-r from-blue-200 to-blue-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Quiz</h2>

        <div className="text-left bg-gray-100 p-5 rounded-md shadow-inner mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Quiz Rules:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-md text-gray-600">
            <li>You will be asked 10 questions one after another.</li>
            <li>1 point will be awarded for each correct answer.</li>
            <li>
              Each question has four options. You can choose only one option.
            </li>
            <li>You can review and change answers before the quiz finishes.</li>
            <li>The result will be declared at the end of the quiz.</li>
          </ul>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Select a Category
        </h3>
        <select
          className="mb-5 p-4 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 text-gray-700"
          value={categoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          className="px-8 py-4 w-full bg-blue-600 text-white text-lg rounded-md hover:bg-blue-800 transition duration-300 shadow-lg"
          onClick={startQuiz}
          disabled={!categoryId}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );

  const renderQuestion = () => {
    if (loading) return <div className="text-center">Loading questions...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!questions || questions.length === 0)
      return <div className="text-center">No questions available.</div>;

    const question = questions[currentQuestionIndex];
    let optionsToDisplay = question.options;
    if (!optionsToDisplay.includes(question.correctAnswer)) {
      const randomIndex = Math.floor(
        Math.random() * (optionsToDisplay.length + 1),
      );
      optionsToDisplay.splice(randomIndex, 0, question.correctAnswer);
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-96px)] p-4">
        <div className="w-full max-w-2xl p-12 bg-white rounded-lg shadow-xl ">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Q {currentQuestionIndex + 1}/{questions.length}
          </h1>
          <h2 className="text-2xl font-bold mb-6">{question.questionText}</h2>
          {optionsToDisplay.map((option, index) => (
            <button
              key={index}
              className={`my-2 px-6 py-3 text-white rounded-md w-full ${userAnswers[currentQuestionIndex] === option ? "bg-green-500" : "bg-blue-500"} hover:bg-green-600 transition duration-300`}
              onClick={() => handleAnswer(option, currentQuestionIndex)}
            >
              {option}
            </button>
          ))}
          <div className="mt-6 flex justify-between space-x-4">
            <button
              className={`px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition duration-300 ${currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={handleFinishQuiz}
              >
                Finish
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const score = userAnswers.reduce(
      (acc, answer, index) =>
        acc + (answer === questions[index].correctAnswer ? 1 : 0),
      0,
    );
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Score</h2>
        <div className="text-6xl text-blue-600 mb-6">
          {score}/{questions ? questions.length : 0}
        </div>
        <button
          className="mb-6 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
          onClick={restartQuiz}
        >
          Restart Quiz
        </button>
        <div className="w-full max-w-2xl">
          {questions?.map((question, index) => (
            <div key={index} className="bg-white p-6 mb-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                {question.questionText}
              </h3>
              <div className="flex flex-col">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center mb-2 pl-4 ${
                      option === questions[index].correctAnswer
                        ? "text-green-600 font-semibold"
                        : option === userAnswers[index]
                          ? "text-red-600 font-semibold"
                          : "text-gray-500"
                    }`}
                  >
                    <input
                      type="radio"
                      id={`option-${index}-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={userAnswers[index] === option}
                      disabled
                      className="mr-2"
                    />
                    <label
                      htmlFor={`option-${index}-${optionIndex}`}
                      className="flex-1"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {quizStarted
        ? showResults
          ? renderResults()
          : renderQuestion()
        : renderSelectionScreen()}
    </div>
  );
};

export default QuizPage;

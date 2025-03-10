import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Import the date adapter

// Registering Chart.js components including TimeScale
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

const LineChart = ({ quizHistory }) => {
  // Extracting number of tries and scores from quiz history
  const tries = quizHistory.map((result, index) => index + 1); // Array of number of tries
  const scores = quizHistory.map((result) => result.score);

  // Data for the line chart
  const data = {
    labels: tries,
    datasets: [
      {
        label: "Quiz Score",
        data: scores,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Options for the line chart
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Number of Tries", // Change x-axis title
        },
        type: "linear", // Change type to 'linear' for numerical data
      },
      y: {
        title: {
          display: true,
          text: "Score",
        },
        min: 0,
        max: 10, // Adjusted max value to 10
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

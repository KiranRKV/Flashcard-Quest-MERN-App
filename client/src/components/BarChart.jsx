import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ categoryData }) => {
  if (!categoryData || categoryData.length === 0) {
    // Handle case where data is not yet available
    return <div>No data available</div>;
  }

  // Extracting category names, min scores, avg scores, and max scores
  const categoryNames = categoryData.map((data) => data.category);
  const minScores = categoryData.map((data) => data.minScore);
  const avgScores = categoryData.map((data) => data.avgScore);
  const maxScores = categoryData.map((data) => data.maxScore);

  // Data for the bar chart
  const data = {
    labels: categoryData.map((data) => data.category),
    datasets: [
      {
        label: "Lowest Score",
        data: minScores,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Average Score",
        data: avgScores,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Highest Score",
        data: maxScores,
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  // Options for the bar chart
  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        min: 0,
        max: 10,
        title: {
          display: true,
          text: "Score",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

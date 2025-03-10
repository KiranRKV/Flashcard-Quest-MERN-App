import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackAdminPage = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("/api/admin/feedback");
        setFeedback(response.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch feedback:",
          error.response?.data?.error || error.message,
        );
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Feedback Messages</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Message</th>
            <th className="py-2 px-4 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4">{item.message}</td>
              <td className="py-2 px-4">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackAdminPage;

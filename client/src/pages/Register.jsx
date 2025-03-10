import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data: responseData } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Registered successfully. Now you can login!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-50 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter name..."
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter password..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

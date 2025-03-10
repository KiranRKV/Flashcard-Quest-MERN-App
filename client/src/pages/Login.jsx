import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    const { email, password } = data;
    try {
      const { data: responseData } = await axios.post("/api/login", {
        email,
        password,
      });
      setUser(responseData.user); 
      localStorage.setItem("token", responseData.token); 

      // Navigate based on user role
      if (responseData.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-50 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={loginUser}>
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

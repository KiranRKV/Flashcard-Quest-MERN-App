import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/userContext";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Update userData when user changes
    if (user) {
      setUserData({ ...userData, name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/profile-info");
      const { name, email } = response.data;
      setUserData({ ...userData, name, email });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { password, newPassword, ...data } = userData;
      const requestData = { ...data };
      console.log("Updated profile data:", requestData);
      const response = await axios.put("/api/profile", requestData);
      toast.success("Profile updated successfully!");
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(error.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/profile/password", {
        password: userData.password,
        newPassword: userData.newPassword,
      });
      toast.success("Password changed successfully!");
      setUserData({ ...userData, password: "", newPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
          Update Profile
        </h2>
        <form onSubmit={updateProfile} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-8 border-t border-gray-200"></div>

        <h2 className="text-3xl font-bold my-8 text-center text-primary">
          Change Password
        </h2>
        <form onSubmit={changePassword} className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={userData.newPassword}
              onChange={(e) =>
                setUserData({ ...userData, newPassword: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

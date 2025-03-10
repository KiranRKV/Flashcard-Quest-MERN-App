import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const RequireAdmin = ({ children, redirectPath = "/error" }) => {
  const { user, error } = useContext(UserContext);

  // Function to check if the user is an admin
  const isAdmin = (user) => {
    return user && user.role === "admin";
  };

  // Handle loading and error states
  if (!user || error) {
    if (error) {
      console.error("Error fetching user data:", error);
      // Optionally display an error specific message or UI here
      return <Navigate to="/error" replace />;
    }
    return <Navigate to={redirectPath} replace />;
  }

  // Check if the user is an admin
  if (!isAdmin(user)) {
    console.warn("Access denied. Admins only.");
    return <Navigate to="/error" replace />;
  }

  // If the user is an admin, render the children components
  return children;
};

const RequireUser = ({ children, redirectPath = "/login" }) => {
  const { user, error } = useContext(UserContext);

  // Handle loading and error states
  if (!user || error) {
    if (error) {
      console.error("Error fetching user data:", error);
      // Optionally display an error specific message or UI here
      return <Navigate to="/error" replace />;
    }
    return <Navigate to={redirectPath} replace />;
  }

  // If the user is logged in, render the children components
  return children;
};

export { RequireAdmin, RequireUser };

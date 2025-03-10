import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      // Example: Check if a session cookie or token is present (This is just a placeholder logic)
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsCheckingAuth(false); // Update isCheckingAuth without making a request
        return; // Exit if no authentication token is present
      }
      try {
        const response = await axios.get("/api/profile", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUser(response.data); // Assumes that response.data is the user object or null
      } catch (error) {
        console.error("Error checking authentication", error);
        setUser(null); // Set user to null on error
      } finally {
        setIsCheckingAuth(false); // Ensure we update the loading state once the check is complete
      }
    };

    checkUserAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      console.log("Logged out successfully");
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Hook to save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, logout, isCheckingAuth }}>
      {children}
    </UserContext.Provider>
  );
}

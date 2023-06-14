/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  const [authState, setAuthState] = useState({
    username: "", // Initialize with an empty string
    id: "",
    status: false, // Initialize with false
  });

  // Update the username when authToken changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/auth", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username, // Set the username property
            id: response.data.id,
            status: true, // Update status to true
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (authToken) {
      fetchUserData();
    } else {
      setAuthState({ ...authState, status: false });
    }
  }, []); // Add authToken as a dependency

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create an AuthContext to share authentication state across the application
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to store the current user information
  const [user, setUser] = useState(null);
  // State to store the authentication token, initialized from localStorage if available
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Function to fetch user details based on the stored token
  const fetchUserDetails = useCallback(async () => {
    if (!token) return; // No need to fetch if no token

    try {
      // Make a request to fetch user profile using the token
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          'x-auth-token': token,
        },
      });
      setUser(response.data); // Set the fetched user data to the state
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      logout(); // Logout if token is invalid
    }
  }, [token]); // Dependency array includes token to re-fetch details if it changes

  // Use effect to fetch user details when the token changes or on initial load
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      // Make a request to login the user
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const newToken = response.data.token;
      setToken(newToken); // Set the received token to the state
      localStorage.setItem('token', newToken); // Store the token in localStorage for persistence
      axios.defaults.headers.common['x-auth-token'] = newToken; // Set the token for all future axios requests
      await fetchUserDetails(); // Fetch user details with the new token
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to handle user registration
  const register = async (userData) => {
    try {
      // Make a request to register the user
      await axios.post('http://localhost:5000/api/users/register', userData);
      // After registration, log the user in automatically
      await login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null); // Clear user data
    setToken(''); // Clear the token
    localStorage.removeItem('token'); // Remove the token from localStorage
    delete axios.defaults.headers.common['x-auth-token']; // Remove the token from axios headers
  };

  // Provide the authentication state and functions to the component tree
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext and AuthProvider for use in other components
export { AuthContext, AuthProvider };

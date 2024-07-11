import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const fetchUserDetails = useCallback(async () => {
    if (!token) return; // No need to fetch if no token

    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          'x-auth-token': token,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      logout(); // Logout if token is invalid
    }
  }, [token]);

  useEffect(() => {
    fetchUserDetails(); // Fetch user details on token change or initial load
  }, [fetchUserDetails]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['x-auth-token'] = newToken; // Set token for all axios requests
      await fetchUserDetails();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('http://localhost:5000/api/users/register', userData);
      await login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

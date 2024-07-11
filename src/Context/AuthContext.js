import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user details if needed
      // axios.get('/api/auth/user').then(response => setUser(response.data));
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    // Fetch user details if needed
    // setUser(response.data.user);
  };

  const register = async (userData) => {
    await axios.post('http://localhost:5000/api/users/register', userData);
    await login(userData.email, userData.password);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

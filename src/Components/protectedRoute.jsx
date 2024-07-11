import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If user does not have the required role, redirect to home page or an unauthorized page
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;

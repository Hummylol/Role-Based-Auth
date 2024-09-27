import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthWrapper = ({ children, role }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('role');

  if (!isLoggedIn || (role && userRole !== role)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default AuthWrapper;
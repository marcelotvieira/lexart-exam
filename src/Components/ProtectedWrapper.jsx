import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AuthWrapper = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return children;

  return <Navigate to="/Signin" />;
};

export default AuthWrapper;

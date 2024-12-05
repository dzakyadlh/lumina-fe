import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { CircularProgress } from '@mui/material';

export const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // If user exists, they are authenticated
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/landing" />;
  }

  return children;
};

export const RedirectIfAuthenticated = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

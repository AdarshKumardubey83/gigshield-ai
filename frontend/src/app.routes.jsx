import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from './features/auth';
import { Dashboard, DashboardProvider } from './features/dashboard';
import { useAuth } from './features/auth/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './features/auth';
import { ProfileSetup } from './features/auth/pages/ProfileSetup';
import { Dashboard, DashboardProvider } from './features/dashboard';
import { useAuth } from './features/auth/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Not logged in → back to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but profile incomplete → profile setup
  if (!user.name || !user.location) {
    return <Navigate to="/profile-setup" replace />;
  }

  // Logged in + profile complete → render page
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
      <Route path="/profile-setup" element={<ProfileSetup />} />
    </Routes>
  );
};

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register } from './features/auth';
import { Dashboard, DashboardProvider } from './features/dashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        } 
      />
    </Routes>
  );
};

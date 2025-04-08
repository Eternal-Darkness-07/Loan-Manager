// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/DashboardPage';
import ApplyLoanPage from './pages/ApplyLoanPage';
import LoanstatusPanel from './pages/loanStatus';
import AdminApplicationsPage from './pages/AdminApplicationPage';
import AdminUsersPage from './pages/AdminUserPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />
      <Route path="/apply-loan" element={isAuthenticated ? <ApplyLoanPage /> : <Navigate to="/login" />} />
      <Route path="/loan-status" element={isAuthenticated ? <LoanstatusPanel /> : <Navigate to="/login" />} />
      <Route path="/admin/dashboard" element={isAuthenticated ? <AdminApplicationsPage /> : <Navigate to="/login" />} />
      <Route path="/admin/applications" element={isAuthenticated ? <AdminApplicationsPage /> : <Navigate to="/login" />} />
      <Route path="/admin/users" element={isAuthenticated ? <AdminUsersPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

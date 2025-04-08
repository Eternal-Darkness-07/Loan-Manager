// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AdminPanel from '../components/AdminPanel';
import VerifierPanel from '../components/VerifirePanel';
import Header from '../components/Header';
import '../style/DashboardPage.css'; // We'll define styles here
import UserDashboard from './UserDashboardPage';
import Sidebar from '../components/Sidebar';

export interface User {
  id: string;
  role: 'ADMIN' | 'VERIFIER' | 'USER';
}

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={user ? user.role : 'USER'}
      />

      <div id="main" style={{ marginLeft: sidebarOpen ? 250 : 0 }}>
        <Header onLogout={handleLogout} onToggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          {user ? (
            user.role === 'ADMIN' ? (
              <AdminPanel />
            ) : user.role === 'VERIFIER' ? (
              <VerifierPanel />
            ) : (
              <UserDashboard />
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

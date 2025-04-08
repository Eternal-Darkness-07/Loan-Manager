import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/UserDashboard.css'; // Using same styles for consistency
import { getAllPendingApplications, getAllUsers } from '../api/api_for_admin';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'VERIFIER';
}

interface Application {
  id: string;
  applicant: string;
  status: string;
}

const AdminPanel: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingApplications, setPendingApplications] = useState<Application[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const [dashboardStats, setDashboardStats] = useState({
    totalPendingApplications: 0,
    totalAdmins: 0,
    totalVerifiers: 0,
  });

  useEffect(() => {
    Promise.all([getAllPendingApplications(), getAllUsers()])
      .then(([appsData, usersData]) => {
        const pendingApps = appsData.applications || [];
        const adminsList = usersData.users || [];

        const verifiersCount = adminsList.filter((user: { role: string; }) => user.role === 'VERIFIER').length;
        const adminsCount = adminsList.filter((user: { role: string; }) => user.role === 'ADMIN').length;

        setPendingApplications(pendingApps);
        setAdmins(adminsList);

        setDashboardStats({
          totalPendingApplications: pendingApps.length,
          totalAdmins: adminsCount,
          totalVerifiers: verifiersCount,
        });
      })
      .catch((err) => console.error('Error loading admin dashboard data:', err));
  }, []);

  return (
    <div className="user-dashboard-wrapper">
      <Sidebar
        userRole="ADMIN"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="dashboard-main-content">
        <h2>Admin Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Pending Applications</h3>
            <p>{dashboardStats.totalPendingApplications}</p>
          </div>
          <div className="card">
            <h3>Total Admins</h3>
            <p>{dashboardStats.totalAdmins}</p>
          </div>
          <div className="card">
            <h3>Total Verifiers</h3>
            <p>{dashboardStats.totalVerifiers}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

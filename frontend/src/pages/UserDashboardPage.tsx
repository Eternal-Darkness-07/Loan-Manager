// src/pages/UserDashboard.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/UserDashboard.css';
import {
  getApprovedApplications,
  getPendingVerificationApplications,
  getTotalApplications,
} from '../api/api_for_user';

interface Application {
  id: string;
  fullName: string;
  address: string;
  tenureMonths: number;
  reason: string;
  amount: number;
  employmentStatus: string;
  employmentAddress: string;
  acceptedTerms: boolean;
  status: string;
}

const UserDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalLoans, setTotalLoans] = useState<Application[]>([]);
  const [pendingLoans, setPendingLoans] = useState<Application[]>([]);
  const [approvedLoans, setApprovedLoans] = useState<Application[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalNumberOfLoans: 0,
    NumberOfapprovedLoans: 0,
    NumberOfpendingLoans: 0,
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return; // Optionally, handle missing userId

    Promise.all([
      getTotalApplications(userId),
      getPendingVerificationApplications(userId),
      getApprovedApplications(userId),
    ])
      .then(([totalData, pendingData, approvedData]) => {
        const totalApps = totalData.applications || [];
        const pendingApps = pendingData.applications || [];
        const approvedApps = approvedData.applications || [];

        setTotalLoans(totalApps);
        setPendingLoans(pendingApps);
        setApprovedLoans(approvedApps);

        setDashboardStats({
          totalNumberOfLoans: totalApps.length,
          NumberOfpendingLoans: pendingApps.length,
          NumberOfapprovedLoans: approvedApps.length,
        });
      })
      .catch((err) => console.error('Error fetching applications:', err));
  }, []);

  return (
    <div className="user-dashboard-wrapper">
      <Sidebar
        userRole="USER"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="dashboard-main-content">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Loans</h3>
            <p>{dashboardStats.totalNumberOfLoans}</p>
          </div>
          <div className="card">
            <h3>Approved Loans</h3>
            <p>{dashboardStats.NumberOfapprovedLoans}</p>
          </div>
          <div className="card">
            <h3>Pending Loans</h3>
            <p>{dashboardStats.NumberOfpendingLoans}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

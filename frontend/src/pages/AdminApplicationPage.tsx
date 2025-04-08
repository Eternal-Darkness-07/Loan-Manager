// src/pages/AdminApplicationsPage.tsx
import React, { useEffect, useState } from 'react';
import { approveApplication, getAllPendingApplications, rejectApplication } from '../api/api_for_admin';
import '../style/AdminApplicationPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { User } from './DashboardPage';
import { useNavigate } from 'react-router-dom';

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

const AdminApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [_user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPendingApplications()
      .then((data) => setApplications(data.applications || []))
      .catch(console.error);
  }, []);

  const handleApprove = (id: string) => {
    approveApplication(id)
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id));
        setSelectedApp(null);
      })
      .catch(console.error);
  };

  const handleReject = (id: string) => {
    rejectApplication(id)
      .then(() => { 
          setApplications(applications.filter((app) => app.id !== id));
          setSelectedApp(null);
        })
      .catch(console.error);
  }

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
    <>
    <Sidebar
    userRole="ADMIN"
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(!sidebarOpen)}
    />
    <div id="main" style={{ marginLeft: sidebarOpen ? 250 : 0 }}>
    <div className="admin-applications-page">
      <Header 
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
        />
      <h2>Pending Loan Applications</h2>
      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th className="center-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="center-cell">{app.fullName}</td>
                  <td className="center-cell">
                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="center-cell">
                    <button
                      className="details-btn"
                      onClick={() => setSelectedApp(app)}
                      >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Application Details */}
      {selectedApp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedApp(null)}>
              &times;
            </button>
            <h3>Application Details</h3>
            <div className="modal-details">
              <p><strong>Name:</strong> {selectedApp.fullName}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Reason:</strong> {selectedApp.reason}</p>
              <p><strong>Amount:</strong> ₹{selectedApp.amount}</p>
              <p><strong>Tenure:</strong> {selectedApp.tenureMonths} months</p>
              <p><strong>Employment Status:</strong> {selectedApp.employmentStatus}</p>
              <p><strong>Employment Address:</strong> {selectedApp.employmentAddress}</p>
              <p>
                <strong>Accepted Terms:</strong>{' '}
                {selectedApp.acceptedTerms ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="modal-actions">
              <button className="verify-btn" onClick={() => handleApprove(selectedApp.id)}>Approve</button>
              <button className="reject-btn" onClick={() => handleReject(selectedApp.id)}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default AdminApplicationsPage;

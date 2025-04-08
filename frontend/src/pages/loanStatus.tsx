import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../style/VerifierPanel.css";
import { getTotalApplications } from "../api/api_for_user";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

interface User {
    id: string;
    role: 'ADMIN' | 'VERIFIER' | 'USER';
}

const LoanstatusPanel: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getTotalApplications(userId!)
      .then((data) => setApplications(data.applications || []))
      .catch(console.error);
  }, []);

  return (
    <>
    <div id="mySidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a className="closebtn" onClick={toggleSidebar}>&times;</a>
        <a href="/dashboard">Dashboard</a>
        {user?.role === 'USER' && (
          <>
            <a href="/apply-loan">Apply for Loan</a>
            <a href="/loan-status">Loan Status</a>
          </>
        )}
        <a href="/profile">Profile</a>
    </div>
    <Header onLogout={handleLogout} onToggleSidebar={toggleSidebar} />
    <Sidebar userRole='USER' isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    <div id="main" style={{ marginLeft: sidebarOpen ? 250 : 0 }}> 

      <div className="verifier-panel">
        <h2>Applications</h2>
        {applications.length === 0 ? (
            <p>No applications</p>
        ) : (
            <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                    <td className="center-cell">{app.fullName}</td>
                    <td className="center-cell">
                      <span
                        className={`status-badge ${app.status.toLowerCase()}`}
                        >
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

        {selectedApp && (
            <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-btn"
                onClick={() => setSelectedApp(null)}
                >
                ×
              </button>
              <h3>Application Details</h3>
              <div className="modal-details">
                <p>
                  <strong>Name:</strong> {selectedApp.fullName}
                </p>
                <p>
                  <strong>Address:</strong> {selectedApp.address}
                </p>
                <p>
                  <strong>Reason:</strong> {selectedApp.reason}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{selectedApp.amount}
                </p>
                <p>
                  <strong>Tenure:</strong> {selectedApp.tenureMonths} months
                </p>
                <p>
                  <strong>Employment Status:</strong>{" "}
                  {selectedApp.employmentStatus}
                </p>
                <p>
                  <strong>Employment Address:</strong>{" "}
                  {selectedApp.employmentAddress}
                </p>
                <p>
                  <strong>Accepted Terms:</strong>{" "}
                  {selectedApp.acceptedTerms ? "Yes" : "No"}
                </p>
              </div>
              <div className="modal-actions"></div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default LoanstatusPanel;

import React, { useEffect, useState } from 'react';
import { getPendingVerificationApplications, rejectApplication, verifyApplication } from '../api/api_for_verifier';
import '../style/VerifierPanel.css';

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

const VerifierPanel: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    getPendingVerificationApplications()
      .then((data) => setApplications(data.applications || []))
      .catch(console.error);
  }, []);

  const handleVerify = (id: string) => {
   verifyApplication(id)
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
  };

  return (
    <>
 
    <div className="verifier-panel">
      <h2>Applications for Verification</h2>
      {applications.length === 0 ? (
        <p>No applications to verify</p>
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
      <td className='center-cell'>{app.fullName}</td>
      <td className='center-cell'>
  <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
</td>

      <td className="center-cell">
        <button className="details-btn" onClick={() => setSelectedApp(app)}>Details</button>
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
            <button className="close-btn" onClick={() => setSelectedApp(null)}>×</button>
            <h3>Application Details</h3>
            <div className="modal-details">
              <p><strong>Name:</strong> {selectedApp.fullName}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Reason:</strong> {selectedApp.reason}</p>
              <p><strong>Amount:</strong> ₹{selectedApp.amount}</p>
              <p><strong>Tenure:</strong> {selectedApp.tenureMonths} months</p>
              <p><strong>Employment Status:</strong> {selectedApp.employmentStatus}</p>
              <p><strong>Employment Address:</strong> {selectedApp.employmentAddress}</p>
              <p><strong>Accepted Terms:</strong> {selectedApp.acceptedTerms ? 'Yes' : 'No'}</p>
            </div>
            <div className="modal-actions">
              <button className="verify-btn" onClick={() => handleVerify(selectedApp.id)}>Verify</button>
              <button className="reject-btn" onClick={() => handleReject(selectedApp.id)}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default VerifierPanel;
// src/components/ApplyLoanPage.tsx
import React, { useState } from 'react';
import '../style/ApplyLoanPage.css';
import { submitLoanApplication } from '../api/api';
import { useNavigate } from 'react-router-dom';

const ApplyLoanPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    loanTenure: '',
    reason: '',
    amountNeeded: '',
    employmentStatus: '',
    employmentAddress: '',
    acceptTerms: false,
    acceptDisclosure: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms || !formData.acceptDisclosure) {
      alert('Please accept all terms and disclosures before submitting.');
      return;
    }

    setLoading(true);

    const payload = {
      fullName: formData.fullName,
      address: formData.address,
      tenureMonths: parseInt(formData.loanTenure, 10),
      reason: formData.reason,
      amount: parseFloat(formData.amountNeeded),
      employmentStatus: formData.employmentStatus,
      employmentAddress: formData.employmentAddress,
      acceptedTerms: formData.acceptTerms,
    };

    try {
      const response = await submitLoanApplication(payload);
      setLoading(false);

      if (response.ok) {
        alert('🎉 Loan application submitted successfully!');
        setFormData({
          fullName: '',
          address: '',
          loanTenure: '',
          reason: '',
          amountNeeded: '',
          employmentStatus: '',
          employmentAddress: '',
          acceptTerms: false,
          acceptDisclosure: false,
        });
        navigate('/dashboard');
      } else {
        alert('❌ Failed to submit loan application.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Loan application error:', error);
      alert('⚠️ An error occurred while submitting your application.');
    }
  };

  return (
    <div className="apply-loan-page">
      <div className="loan-card">
        <h2 className="loan-card-title">Apply for a Loan</h2>
        <form className="loan-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Loan Tenure (months)</label>
            <input name="loanTenure" type="number" value={formData.loanTenure} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Reason for Loan</label>
            <input name="reason" value={formData.reason} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Amount Needed</label>
            <input name="amountNeeded" type="number" value={formData.amountNeeded} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Employment Status</label>
            <input name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Employment Address</label>
            <input name="employmentAddress" value={formData.employmentAddress} onChange={handleChange} required />
          </div>

          <div className="form-group checkbox-group">
  <label className="checkbox-label">
    <input
      type="checkbox"
      name="acceptTerms"
      checked={formData.acceptTerms}
      onChange={handleChange}
    />
    I have read the important information and accept that by completing the application I will be bound by the terms.
  </label>
</div>
<div className="form-group checkbox-group">
  <label className="checkbox-label">
    <input
      type="checkbox"
      name="acceptDisclosure"
      checked={formData.acceptDisclosure}
      onChange={handleChange}
    />
    Any personal and credit information obtained may be disclosed to other lenders, credit bureaus or credit reporting agencies.
  </label>
</div>


<div className="button-group">
  <button type="submit" className="submit-button" disabled={loading}>
    {loading ? 'Submitting...' : 'Submit Application'}
  </button>
  <button type="button" className="submit-button cancel-button" onClick={() => navigate('/dashboard')}>
    Back
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default ApplyLoanPage;

const API_BASE_URL = 'https://loan-manager-obap.onrender.com'; // Adjust if your backend is hosted elsewhere

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// User Authentication
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role: 'USER' }),
  });
  return response;
};

// Loan Application
export const submitLoanApplication = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/loan-applications/apply`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(formData),
  });
  return response;
};

// // Dashboard Stats (Dummy or Replace with real API)
// export const getUserDashboardStats = async () => {
//   const response = await fetch(`${API_BASE_URL}/dashboard-stats`, {
//     method: 'GET',
//     headers: headers(),
//   });
//   return response.json();
// };
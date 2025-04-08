const API_BASE_URL = 'http://localhost:5000'; // Adjust if your backend is hosted elsewhere
const getToken = () => localStorage.getItem('token');
const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
});

export const getPendingVerificationApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/api/verifier/pending-loan-applications`, {
        method: 'GET',
        headers: headers(),
    });
    return response.json();
}

export const verifyApplication = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/verifier/loan-applications/${id}/verify`, {
        method: 'POST',
        headers: headers(),
    });
    return response;
}

export const rejectApplication = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/verifier/loan-applications/${id}/reject`, {
        method: 'POST',
        headers: headers(),
    });
    return response;
}

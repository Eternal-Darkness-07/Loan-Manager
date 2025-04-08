const API_BASE_URL = 'http://localhost:5000'; // Adjust if your backend is hosted elsewhere
const getToken = () => localStorage.getItem('token');
const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
});

export const getTotalApplications = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/applications/${id}`, {
        method: 'GET',
        headers: headers(),
    });
    return response.json();
}

export const getPendingVerificationApplications = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/applications/${id}/pending`, {
        method: 'GET',
        headers: headers(),
    });
    return response.json();
}

export const getApprovedApplications = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/applications/${id}/approved`, {
        method: 'GET',
        headers: headers(),
    });
    return response.json();
}


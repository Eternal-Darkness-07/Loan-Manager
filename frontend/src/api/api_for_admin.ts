const API_BASE_URL = 'https://loan-manager-obap.onrender.com'; // Adjust if your backend is hosted elsewhere
const getToken = () => localStorage.getItem('token');
const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
});

export const getAllPendingApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/loan-applications`, {
        method: 'GET',
        headers: headers(),
    });
    return response.json();
};

export const approveApplication = async (applicationId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/loan-applications/${applicationId}/approve`, {
        method: 'POST',
        headers: headers(),
    });
    return response.json();
};

export const rejectApplication = async (applicationId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/loan-applications/${applicationId}/reject`, {
        method: 'POST',
        headers: headers(),
    });
    return response.json();
};

export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'GET',
        headers: headers(),
    });
    return response.json();
};

export const addAdmin = async (name: string, email: string, password: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/add`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ name, email, password, role }),
    });
    return response.json();
};

export const deleteAdmin = async (adminId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/${adminId}`, {
        method: 'DELETE',
        headers: headers(),
    });
    return response.json();
};

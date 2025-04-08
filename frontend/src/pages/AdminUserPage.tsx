// src/pages/AdminUsersPage.tsx
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteAdmin, addAdmin } from "../api/api_for_admin";
import AddUserForm, { NewUser } from "../components/AddUserForm";
import "../style/AdminUserPage.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "VERIFIER";
}

const userId = localStorage.getItem("userId") || null;

const AdminUsersPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((data) => setAdmins(data.users || []))
      .catch(console.error);
  }, []);

  const handleDeleteAdmin = (id: string) => {
    deleteAdmin(id)
      .then(() => {
        setAdmins(admins.filter((admin) => admin.id !== id));
      })
      .catch(console.error);
  };

  const addNewUser = (newUser: NewUser) => {
    addAdmin(newUser.name, newUser.email, newUser.password, newUser.role)
      .then((data) => {
        setAdmins([...admins, data.newUser]);
        setShowAddUserForm(false);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <Sidebar
        userRole="ADMIN"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(!sidebarOpen)}
      />
      <div id="main" style={{ marginLeft: sidebarOpen ? 250 : 0 }}>
        <div className="admin-users-page">
          <Header
            onLogout={handleLogout}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <div className="admin-header">
            <h2>Manage Admins/Verifiers</h2>
            <button
              className="add-user-btn"
              onClick={() => setShowAddUserForm(true)}
            >
              Add User
            </button>
          </div>

          {admins.length === 0 ? (
            <p>No admin users found.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="center-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>
                        <span
                          className={`role-badge ${admin.role.toLowerCase()}`}
                        >
                          {admin.role}
                        </span>
                      </td>

                      <td className="center-cell">
                        { userId !== admin.id ? (
                          <button onClick={() => handleDeleteAdmin(admin.id)}>
                          Delete
                          </button>
                          ) : (
                          <button disabled style={{backgroundColor: "gray"}}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal for Add User Form */}
          {showAddUserForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-btn"
                  onClick={() => setShowAddUserForm(false)}
                >
                  &times;
                </button>
                <AddUserForm
                  onAdd={addNewUser}
                  onClose={() => setShowAddUserForm(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;

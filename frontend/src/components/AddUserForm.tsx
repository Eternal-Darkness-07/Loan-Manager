// src/components/AddUserForm.tsx
import React, { useState } from 'react';

export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'VERIFIER';
}

interface AddUserFormProps {
  onAdd: (newUser: NewUser) => void;
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Note: using uppercase values for consistency with backend enum
  const [role, setRole] = useState<'ADMIN' | 'VERIFIER'>('ADMIN');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: NewUser = { name, email, password, role };

    try {
        onAdd(newUser);
        onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  return (
    <div className="add-user-form">
      <h3>Add Admin / Verifier</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'ADMIN' | 'VERIFIER')}
        >
          <option value="ADMIN">Admin</option>
          <option value="VERIFIER">Verifier</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;

// src/components/Sidebar.tsx
import React from 'react';
import '../style/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const links = {
  USER: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/apply-loan', label: 'Apply for Loan' },
    { href: '/loan-status', label: 'Loan Status' },
  ],
  ADMIN: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin/applications', label: 'Applications' },
    { href: '/admin/users', label: 'Manage Users' },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="closebtn" onClick={onClose}>&times;</button>
      {(links[userRole as keyof typeof links] || []).map((link) => (
        <a key={link.href} href={link.href}>{link.label}</a>
      ))}
    </div>
  );
};

export default Sidebar;

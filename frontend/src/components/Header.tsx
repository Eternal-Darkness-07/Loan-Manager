// src/components/Header.tsx
import React from 'react';
import '../style/Header.css';

interface HeaderProps {
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onToggleSidebar }) => {
  return (
    <header className="header">
      <button className="openbtn" onClick={onToggleSidebar}>
        &#9776;
      </button>
      <h1>Loan Manager</h1>
      <div className="header-actions">
        {onLogout && <button onClick={onLogout}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;

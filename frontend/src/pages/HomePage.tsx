// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}>
      <div
        className="home-container"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "1.5rem",
          flex: "1",

          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "20rem",
        }}
      >
        <h1>Welcome to Loan Manager</h1>
        <div
          className="button-group"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

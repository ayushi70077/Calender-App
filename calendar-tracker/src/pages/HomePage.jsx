// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Calendar Tracker</h1>
      <p>Select a module to proceed:</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/admin" style={linkStyle}>
          Admin
        </Link>
        <Link to="/user" style={linkStyle}>
          User
        </Link>
        <Link to="/reports" style={linkStyle}>
          Reports
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  color: "#fff",
  backgroundColor: "#007bff",
  borderRadius: "5px",
  textDecoration: "none",
};

export default HomePage;

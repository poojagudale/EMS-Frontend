import React from "react";
import { useNavigate } from "react-router-dom";
import adminIcon from "../assets/images/admin.png";
import employeeIcon from "../assets/images/employee.png";
import "./FirstPage.css";

export default function FirstPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card">
        <div className="header">
          <h1>Welcome To Employee Management System</h1>
        
        </div>
        <div className="sub-header">
          <h2>Employee Management System</h2>
          <p>Login Here</p>
        </div>
        <div className="options">
          <div className="option">
            <img src={adminIcon} alt="Admin Icon" className="icon" />
            <button
              className="admin-button"
              onClick={() => navigate("/admin-login")}
            >
              Admin Login
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
}

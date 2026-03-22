import React from "react";
import "./EmployeeLogin.css";

export default function EmployeeLogin() 
{
  return (
    <div className="login-container">
      <div className="header">
        <h1>Welcome To Employee Management System</h1>
        <p>Please Login to continue</p>
      </div>
      <div className="login-card">
        <h2>Employee Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="employee-username">Username:</label>
            <input type="text" id="employee-username" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="employee-password">Password:</label>
            <input type="password" id="employee-password" placeholder="Enter password" />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

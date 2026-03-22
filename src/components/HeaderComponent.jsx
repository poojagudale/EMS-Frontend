import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header>
      <nav>
        <h2 className="nav-title">Employee Management</h2>
        <hr className="nav-divider" /> {/* White Line Below Title */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/employees">Employee</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/salary">Salary</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/attendance">Attendance</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/stock">Stock</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
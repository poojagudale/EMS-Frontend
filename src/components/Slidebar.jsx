import React from "react";
import { Link } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsCashStack,
  BsCurrencyRupee,
  BsListCheck,
  BsBoxSeam,
  BsEnvelopeFill,
  BsBoxArrowRight,
  BsShop,
} from "react-icons/bs";

function Slidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <div
      className={`bg-dark text-white position-fixed start-0 ${
        openSidebarToggle ? "d-block" : "d-none"
      }`}
      style={{
        top: "56px", // assuming top navbar height is 56px
        width: "250px",
        height: "calc(100vh - 56px)",
        zIndex: 1040,
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
        <div className="d-flex align-items-center">
          <BsShop className="me-2 fs-5" />
          <h5 className="m-0">GANESH TEXTILES</h5>
        </div>
        
      </div>

      {/* Sidebar Links */}
      <ul className="nav flex-column px-3 pt-2">
        <li className="nav-item mb-2">
          <Link to="/home" className="nav-link text-white">
            <BsGrid1X2Fill className="me-2" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/employees" className="nav-link text-white">
            <BsPeopleFill className="me-2" />
            EMPLOYEE
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/generate-salary" className="nav-link text-white">
            <BsCashStack className="me-2" />
            SALARY PRODUCTION
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/salary-production" className="nav-link text-white">
            <BsCurrencyRupee className="me-2" />
            SALARY
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/attendance" className="nav-link text-white">
            <BsListCheck className="me-2" />
            ATTENDANCE
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/stock" className="nav-link text-white">
            <BsBoxSeam className="me-2" />
            STOCK
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/contact-us" className="nav-link text-white">
            <BsEnvelopeFill className="me-2" />
            Contact Us
          </Link>
        </li>
        <li className="nav-item mt-auto">
          <Link to="/" className="nav-link text-white">
            <BsBoxArrowRight className="me-2" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Slidebar;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Slidebar from "./components/Slidebar";
import Home from "./components/Home";
import FirstPage from "./components/FirstPage";
import AdminLogin from "./components/AdminLogin";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import ListSalaryComponent from "./components/ListSalaryComponent";
import SalaryComponent from "./components/SalaryComponent";
import Stock from "./components/Stock";
import Attendance from "./components/Attendance";
import ContactUs from "./components/contactus";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle((prev) => !prev); // This toggles visibility
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/*"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Slidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <div className="main-content" style={{ marginTop: '60px' }}>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="employees" element={<ListEmployeeComponent />} />
                  <Route path="add-employee" element={<EmployeeComponent />} />
                  <Route path="edit-employee/:id" element={<EmployeeComponent />} />
                  <Route path="generate-salary" element={<SalaryComponent />} />
                  <Route path="salary-production" element={<ListSalaryComponent />} />
                  <Route path="stock" element={<Stock />} />
                  <Route path="attendance" element={<Attendance />} />
                  <Route path="contact-us" element={<ContactUs />} />
                  <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

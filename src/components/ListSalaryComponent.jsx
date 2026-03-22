import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListSalaryComponent = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [employeeIds, setEmployeeIds] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    fetchEmployeeIds();
  }, []);

  const fetchEmployeeIds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      setEmployeeIds(response.data);
    } catch (error) {
      console.error("Error fetching employee IDs:", error);
      toast.error("❌ Failed to fetch employees");
    }
  };

  const getMonthRange = (year, monthIndex) => {
    const startDate = new Date(year, monthIndex, 1).toISOString().split("T")[0];
    const endDate = new Date(year, monthIndex + 1, 0).toISOString().split("T")[0];
    return { startDate, endDate };
  };

  const fetchSalariesAndCloth = async (year, monthIndex) => {
    setSelectedMonth(months[monthIndex]);
    setSalaries([]);
    setLoading(true);

    const { startDate, endDate } = getMonthRange(year, monthIndex);

    try {
      const salaryData = await Promise.all(
        employeeIds.map(async (employee) => {
          try {
            const [salaryRes, clothRes] = await Promise.all([
              axios.get(`http://localhost:8080/api/salary/${employee.id}/monthly`, {
                params: { startDate, endDate },
              }),
              axios.get(`http://localhost:8080/api/salary/${employee.id}/monthly-cloth`, {
                params: { startDate, endDate },
              }),
            ]);

            return {
              employeeId: employee.id,
              salary: salaryRes.data ?? 0,
              cloth: clothRes.data ?? 0,
            };
          } catch (err) {
            console.error(`Error fetching data for Employee ${employee.id}:`, err);
            return {
              employeeId: employee.id,
              salary: 0,
              cloth: 0,
            };
          }
        })
      );

      setSalaries(salaryData);
      toast.success(`✅ Salary data fetched for ${months[monthIndex]} ${year}`);
    } catch (error) {
      console.error("Error fetching salary data:", error);
      toast.error("❌ Error fetching salary data");
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async (employeeId, salary) => {
    if (!selectedMonth) {
      toast.error("❌ Please select a month first");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${employeeId}`);
      let mobileNumber = response.data.mobileNumber?.trim();

      if (!mobileNumber) {
        toast.error(`❌ Mobile number not found for Employee ID: ${employeeId}`);
        return;
      }

      if (!mobileNumber.startsWith("+91")) {
        mobileNumber = `+91${mobileNumber}`;
      }

      const message = `GANESH TEXTILES: Dear Employee, your salary for ${selectedMonth} ${selectedYear} is ₹${salary}.`;

      const smsResponse = await axios.post(`http://localhost:8080/api/sms/send`, null, {
        params: {
          to: mobileNumber,
          message: message,
        },
      });

      if (smsResponse.data.status === "success") {
        toast.success(`📩 SMS sent to ${mobileNumber}`);
      } else {
        toast.error(`❌ Failed to send SMS: ${smsResponse.data.message}`);
      }
    } catch (error) {
      console.error("SMS Error:", error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`❌ SMS sending failed: ${errorMessage}`);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="row">
        <div className="col-md-3 d-flex flex-column align-items-center">
          <h6>Select Year</h6>
          <select
            className="form-select mb-3"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{ width: "120px", fontSize: "small" }}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>

          <h6>Select Month</h6>
          <div className="d-flex flex-column align-items-center">
            {months.map((month, index) => (
              <button
                key={index}
                className={`btn btn-primary btn-sm my-1 ${selectedMonth === month ? "active" : ""}`}
                style={{ width: "80px", height: "30px", fontSize: "small" }}
                onClick={() => fetchSalariesAndCloth(selectedYear, index)}
                disabled={loading}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <h4 className="text-center">
            {selectedMonth ? `${selectedMonth} ${selectedYear}` : "Select a Month"}
          </h4>
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-3">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Cloth Made (m)</th>
                  <th>Salary (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center">Loading...</td>
                  </tr>
                ) : salaries.length > 0 ? (
                  <>
                    {salaries.map((salary) => (
                      <tr key={salary.employeeId}>
                        <td>{salary.employeeId}</td>
                        <td>{salary.cloth}</td>
                        <td>{salary.salary}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleNotify(salary.employeeId, salary.salary)}
                            disabled={salary.salary === 0 || loading}
                          >
                            Notify
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>{salaries.reduce((total, item) => total + item.cloth, 0)} m</strong></td>
                      <td colSpan={2}></td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No salary records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSalaryComponent;

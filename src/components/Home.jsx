import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState(null);
  const [salaryTotal, setSalaryTotal] = useState(null);
  const [attendanceCount, setAttendanceCount] = useState(null);
  const [stockTotal, setStockTotal] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employees")
      .then(response => setEmployeeCount(response.data.length))
      .catch(error => console.error("Error fetching employees:", error));

    axios.get("http://localhost:8080/api/attendance/all")
      .then(response => setAttendanceCount(response.data.length))
      .catch(error => console.error("Error fetching attendance:", error));

    axios.get("http://localhost:8080/api/stocks")
      .then(response => {
        const totalStock = response.data.reduce((sum, item) => sum + item.quantity, 0);
        setStockTotal(totalStock);
      })
      .catch(error => console.error("Error fetching stock:", error));

    axios.get("http://localhost:8080/api/employees")
      .then(response => {
        const employees = response.data;
        const startDate = "2025-04-01";
        const endDate = "2025-04-30";

        const salaryRequests = employees.map(emp =>
          axios.get(`http://localhost:8080/api/salary/${emp.id}/monthly`, { params: { startDate, endDate } })
            .then(res => res.data)
            .catch(error => {
              console.error(`Error fetching salary for ${emp.id}:`, error);
              return 0;
            })
        );

        Promise.all(salaryRequests).then(salaries => {
          const totalSalary = salaries.reduce((sum, salary) => sum + salary, 0);
          setSalaryTotal(totalSalary);
        });
      })
      .catch(error => console.error("Error fetching employee list:", error));
  }, []);

  useEffect(() => {
    if (employeeCount !== null && salaryTotal !== null && attendanceCount !== null && stockTotal !== null) {
      setChartData([
        { category: "Counts", Employees: employeeCount, Salary: salaryTotal, Attendance: attendanceCount, Stock: stockTotal }
      ]);
    }
  }, [employeeCount, salaryTotal, attendanceCount, stockTotal]);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: "1",
            minWidth: "220px",
            textAlign: "center",
          }}
        >
          <h3>EMPLOYEES</h3>
          <h1>{employeeCount !== null ? employeeCount : "Loading..."}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: "1",
            minWidth: "220px",
            textAlign: "center",
          }}
        >
          <h3>SALARY</h3>
          <h1>₹{salaryTotal !== null ? salaryTotal.toLocaleString() : "Loading..."}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#22c55e",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: "1",
            minWidth: "220px",
            textAlign: "center",
          }}
        >
          <h3>ATTENDANCE</h3>
          <h1>{attendanceCount !== null ? attendanceCount : "Loading..."}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: "1",
            minWidth: "220px",
            textAlign: "center",
          }}
        >
          <h3>STOCK</h3>
          <h1>{stockTotal !== null ? stockTotal : "Loading..."}</h1>
        </motion.div>
      </div>

      {/* Single Column Bar Chart */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BarChart width={600} height={350} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Employees" fill="#3b82f6" name="Employees" />
          <Bar dataKey="Salary" fill="#f97316" name="Salary" />
          <Bar dataKey="Attendance" fill="#22c55e" name="Attendance" />
          <Bar dataKey="Stock" fill="#ef4444" name="Stock" />
        </BarChart>
      </div>
    </div>
  );
};

export default Home;

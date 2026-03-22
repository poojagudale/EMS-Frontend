import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SalaryComponent = () => {
  const [employeeId, setEmployeeId] = useState(0);
  const [chooseDate, setChooseDate] = useState("");
  const [cloth, setCloth] = useState(0);
  const [salary, setSalary] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (employeeId === 0) newErrors.employeeId = "Please select an employee.";
    if (!chooseDate) newErrors.chooseDate = "Please select a date.";
    if (cloth === "" || cloth < 0) newErrors.cloth = "Cloth cannot be empty or negative.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.get(
        `http://localhost:8080/api/salary/${employeeId}/${chooseDate}`
      );
      if (response.status === 200 && response.data) {
        await axios.put(`http://localhost:8080/api/salary/update/${employeeId}`, {
          employeeId,
          chooseDate,
          cloth: parseInt(cloth),
          salary,
        });
        alert("Salary record updated successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          await axios.post("http://localhost:8080/api/salary", {
            employeeId,
            chooseDate,
            cloth: parseInt(cloth),
            salary,
          });
          alert("Salary record added successfully!");
        } catch (postError) {
          console.error("Error adding salary:", postError);
          alert("Failed to add salary record!");
        }
      } else {
        console.error("Error checking salary record:", error);
        alert("Something went wrong. Please try again!");
      }
    }
  };

  const handleClothChange = (e) => {
    const clothValue = parseInt(e.target.value);
    if (clothValue >= 0) {
      setCloth(clothValue);
      setSalary(clothValue * 2);
    } else {
      setCloth(0);
      setSalary(0);
    }
  };

  return (
    <Container className="mt-4 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4" style={{ color: "black", fontWeight: "normal" }}>
        Salary Production
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Choose Date:</Form.Label>
          <input
            type="date"
            className={`form-control ${errors.chooseDate ? "is-invalid" : ""}`}
            value={chooseDate}
            onChange={(e) => setChooseDate(e.target.value)}
          />
          {errors.chooseDate && <div className="invalid-feedback">{errors.chooseDate}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Employee:</Form.Label>
          <select
            className={`form-select ${errors.employeeId ? "is-invalid" : ""}`}
            value={employeeId}
            onChange={(e) => setEmployeeId(parseInt(e.target.value))}
          >
            <option value={0}>Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.id}  {emp.name}
              </option>
            ))}
          </select>
          {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cloth (in meters):</Form.Label>
          <Form.Control
            type="number"
            value={cloth}
            onChange={handleClothChange}
            className={errors.cloth ? "is-invalid" : ""}
            min="0"
            required
          />
          {errors.cloth && <div className="invalid-feedback">{errors.cloth}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Salary (in ₹):</Form.Label>
          <Form.Control type="text" value={salary} disabled />
        </Form.Group>

        <div className="text-start">
          <Button type="submit" variant="primary" size="sm">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SalaryComponent;

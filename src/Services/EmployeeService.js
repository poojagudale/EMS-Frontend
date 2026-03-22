import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => 
    axios.get(REST_API_BASE_URL)
         .catch(error => console.error("Error fetching employee list:", error));

export const createEmployee = (employee) => 
    axios.post(REST_API_BASE_URL, employee)
         .catch(error => console.error("Error creating employee:", error));

export const getEmployee = (employeeId) => 
    axios.get(`${REST_API_BASE_URL}/${employeeId}`)
         .catch(error => console.error(`Error fetching employee with ID ${employeeId}:`, error));

export const updateEmployee = (employeeId, employee) => 
    axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee)
         .catch(error => console.error(`Error updating employee with ID ${employeeId}:`, error));

export const deleteEmployee = (employeeId) => 
    axios.delete(`${REST_API_BASE_URL}/${employeeId}`)
         .catch(error => console.error(`Error deleting employee with ID ${employeeId}:`, error));

import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
   const [employees, setEmployees] = useState([]);
   const navigator = useNavigate();
    
   useEffect(() => {
       getAllEmployees();
   }, []);

   function getAllEmployees() {
       listEmployees()
           .then((response) => {
               console.log("Employee List API Response:", response.data); 
               setEmployees(response.data);
           })
           .catch(error => {
               console.error("Error fetching employees:", error);
           });
   }

   function addNewEmployee() {
       navigator('/add-employee');
   }

   function updateEmployee(id) {
       navigator(`/edit-employee/${id}`);
   }

   function removeEmployee(id) {
       console.log("Deleting Employee ID:", id);
       deleteEmployee(id)
           .then(() => {
               getAllEmployees();
           })
           .catch(error => {
               console.error("Error deleting employee:", error);
           });
   }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Address</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(employee => 
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNumber || employee.mobileNo || "N/A"}</td> 
                <td>{employee.address || "N/A"}</td>
                <td>{employee.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString() : "N/A"}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>&nbsp;&nbsp;
                  <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent;

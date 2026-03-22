import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        address: '',
        dateOfJoining: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName || '');
                    setLastName(response.data.lastName || '');
                    setEmail(response.data.email || '');
                    setMobileNumber(response.data.mobileNumber || '');
                    setAddress(response.data.address || '');
                    setDateOfJoining(response.data.dateOfJoining || '');
                })
                .catch(error => {
                    console.error("Error fetching employee:", error);
                });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = {
                firstName,
                lastName,
                email,
                mobileNumber,
                address,
                dateOfJoining: dateOfJoining ? new Date(dateOfJoining).toISOString().split('T')[0] : null
            };

            if (id) {
                updateEmployee(id, employee)
                    .then(() => {
                        navigator('/employees', { replace: true });
                    })
                    .catch(error => {
                        console.error("Error updating employee:", error);
                    });
            } else {
                createEmployee(employee)
                    .then(() => {
                        navigator('/employees', { replace: true });
                    })
                    .catch(error => {
                        console.error("Error creating employee:", error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (/^\d{10}$/.test(mobileNumber)) {
            errorsCopy.mobileNumber = '';
        } else {
            errorsCopy.mobileNumber = 'Mobile Number must be 10 digits';
            valid = false;
        }

        if (address.trim()) {
            errorsCopy.address = '';
        } else {
            errorsCopy.address = 'Address is required';
            valid = false;
        }

        if (dateOfJoining.trim()) {
            errorsCopy.dateOfJoining = '';
        } else {
            errorsCopy.dateOfJoining = 'Date of Joining is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>;
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Enter Employee Email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Mobile Number:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Mobile Number'
                                    value={mobileNumber}
                                    className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                {errors.mobileNumber && <div className='invalid-feedback'>{errors.mobileNumber}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Address:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Address'
                                    value={address}
                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Date of Joining:</label>
                                <input
                                    type='date'
                                    value={dateOfJoining}
                                    className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDateOfJoining(e.target.value)}
                                />
                                {errors.dateOfJoining && <div className='invalid-feedback'>{errors.dateOfJoining}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    // eslint-disable-next-line
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const registerAction = async (e) => {
        e.preventDefault();
        console.log({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            userRole: userRole
        })
        setIsSubmitting(true);
        try {
            await axios.post('https://rms-api-hxn76.ondigitalocean.app/api/v1/user/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                userRole: userRole
            });
            setIsSubmitting(false);
            setSuccess(true);
        } catch (error) {
            setIsSubmitting(false);
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                console.log(error.message);
                console.log(error);
                setError('Registration failed. Please try again later.');
            }
        }
    };



    // const registerAction = async (e) => {
    //     e.preventDefault();
    //     console.log({
    //         first_name: firstName,
    //         last_name: lastName,
    //         email,
    //         password,
    //         userRole: userRole
    //     })
    //     setIsSubmitting(true);
    
    //     try {
    //         const response = await fetch('localhost:8080/api/v1/user/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 first_name: firstName,
    //                 last_name: lastName,
    //                 email,
    //                 password,
    //                 userRole: userRole
    //             })
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Registration failed');
    //         }
    
    //         setIsSubmitting(false);
    //         setSuccess(true);
    //     } catch (error) {
    //         setIsSubmitting(false);
    //         setError('Registration failed. Please try again later.');
    //     }
    // };
    


    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Register</h5>
                            {success && (
                                <div className="alert alert-success" role="alert">
                                    Registration successful! You can now <Link to="/">login</Link>.
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={registerAction}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {validationErrors.first_name && (
                                        <small className="text-danger">{validationErrors.first_name[0]}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {validationErrors.last_name && (
                                        <small className="text-danger">{validationErrors.last_name[0]}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {validationErrors.email && (
                                        <small className="text-danger">{validationErrors.email[0]}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {validationErrors.password && (
                                        <small className="text-danger">{validationErrors.password[0]}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userRole" className="form-label">
                                        User Role
                                    </label>
                                    <select
                                        className="form-select"
                                        id="userRole"
                                        name="userRole"
                                        value={userRole}
                                        onChange={(e) => setUserRole(e.target.value)}>
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="STAFF">STAFF</option>
                                    </select>
                                    {validationErrors.user_role && (
                                        <small className="text-danger">{validationErrors.user_role[0]}</small>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        {isSubmitting ? 'Registering...' : 'Register Now'}
                                    </button>
                                    <p className="text-center">
                                        Already have an account? <Link to="/">Login here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Register;

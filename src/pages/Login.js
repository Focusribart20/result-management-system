import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loginAction = (e) => {
        e.preventDefault();
        setValidationError('');
        setIsSubmitting(true);
        const payload = {
            email,
            password,
        };
        axios.post('https://rms-api-hxn76.ondigitalocean.app/api/v1/user/login', payload)
            .then((response) => {
                setIsSubmitting(false);
                const user = response.data; // Adjust this according to your API response structure
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard');
            })
            .catch((error) => {
                setIsSubmitting(false);
                if (error.response.data.error) {
                    setValidationError('Incorrect email or password.');
                } else if (error.response.data.errors) {
                    // Handle other validation errors if necessary
                }
            });
    };

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Sign In</h5>
                            <form onSubmit={loginAction}>
                                {validationError && (
                                    <p className="text-center">
                                        <small className="text-danger">{validationError}</small>
                                    </p>
                                )}
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
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                    <p className="text-center">
                                        Don't have an account? <Link to="/register">Register here</Link>
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

export default Login;

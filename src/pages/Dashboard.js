import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function Dashboard() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios.get('https://rms-api-hxn76.ondigitalocean.app/api/v1/user')
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Layout>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                Dashboard
                            </a>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Welcome, {user.name || 'User'}!</h2>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;

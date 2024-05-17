import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import OverlayNav from '../components/OverlayNav'; // Import the OverlayNav component

function Dashboard() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <Layout>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                Dashboard
                            </a>
                            <OverlayNav /> {/* Add the OverlayNav component here */}
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Welcome, {user.first_name || 'User'}!</h2>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;

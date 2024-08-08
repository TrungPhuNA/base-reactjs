import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import GuestLayout from './components/GuestLayout';
import LoginLayout from './components/LoginLayout';
import RegisterLayout from './components/RegisterLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/Dashboard';
import Home from './pages/guest/Home';
import Product from './pages/guest/Product';
import Login from './pages/guest/Login';
import Register from './pages/guest/Register';
import Category from "./pages/guest/Category";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        console.info("===========[App] ===========[useEffect] : ",storedUser);
        if (token && storedUser) {
            console.info("===========[App] ===========[isAuthenticated] : ",isAuthenticated);
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
            console.info("===========[App] ===========[isAuthenticated] : ",JSON.parse(storedUser).role);
        }
    }, []);

    const handleLogin = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                {user?.role === 'admin' ? (
                    <Route path="admin/*" element={<AdminLayout isAuthenticated={isAuthenticated} user={user} />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                    </Route>
                ) : user?.role === 'customer' ? (
                    <Route path="user/*" element={<UserLayout isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />}>
                        <Route index element={<UserDashboard />} />
                        <Route path="dashboard" element={<UserDashboard />} />
                    </Route>
                ) : (
                    <Route path="/*" element={<GuestLayout />}>
                        <Route index element={<Home />} />
                        <Route path="product" element={<Product />} />
                        <Route path="c/:slug" element={<Category />} />
                    </Route>
                )}
                <Route path="login" element={<LoginLayout />}>
                    <Route index element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} onLogin={handleLogin} />} />
                </Route>
                <Route path="register" element={<RegisterLayout />}>
                    <Route index element={<Register setIsAuthenticated={setIsAuthenticated} setUser={setUser} onLogin={handleLogin} />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;

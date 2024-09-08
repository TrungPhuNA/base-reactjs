import React, {useEffect, useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';
import {useSelector} from 'react-redux';
import ServiceManager from "../pages/admin/ServiceManager";
import PromotionManager from "../pages/admin/PromotionManager";
import UserManager from "../pages/admin/UserManager";
import MenuManager from "../pages/admin/MenuManager";
import CategoryManager from "../pages/admin/CategoryManager";
import AppointmentManager from "../pages/admin/AppointmentManager";
import ProductManager from "../pages/admin/ProductManager";
import OrderManager from "../pages/admin/OrderManager";

const AdminRoutes = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(user) setLoading(false);
    }, [user]);

    if (loading) {
        return <div>Đang tải trang...</div>; // Show a loading indicator while waiting for auth state
    }

    if (!user) {
        return null; // Trả về null nếu không phải là customer
        // return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    if (user.role !== 'admin' && user.role !== 'staff') {
        return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page if neither admin nor staff
    }

    return (
        <Routes>
            <Route element={<AdminLayout isAuthenticated={isAuthenticated} user={user} />}>
                {/* Common Routes for both admin and staff */}
                <Route path="services" element={<ServiceManager />} />
                <Route path="promotions" element={<PromotionManager />} />
                <Route path="appointments" element={<AppointmentManager />} />
                <Route path="products" element={<ProductManager />} />
                <Route path="orders" element={<OrderManager />} />

                {/* Admin-only Routes */}
                {user.role === 'admin' && (
                    <>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="user" element={<UserManager />} />
                        <Route path="menus" element={<MenuManager />} />
                        <Route path="categories" element={<CategoryManager />} />
                        {/* Add other admin-only routes here */}
                    </>
                )}

                {/* Staff trying to access admin-only routes should be redirected */}
                {user.role === 'staff' && (
                    <Route path="*" element={<Navigate to="/unauthorized" />} />
                )}
            </Route>
        </Routes>
    );
};

export default AdminRoutes;

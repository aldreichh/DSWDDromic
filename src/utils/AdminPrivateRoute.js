import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminPrivateRoutes = () => {
    const storedDataString = localStorage.getItem('data');
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;

    const setAuthToken = (token) => {
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    };
    const token = Cookies.get('remember_token');
    setAuthToken(token);
    const isAuthenticated = !!token;
    const isAdmin = isAuthenticated && storedData && storedData.role === 'Admin';
    const isActive = isAuthenticated && storedData && storedData.status === 'Active';
    

    return isAuthenticated && isAdmin && isActive ? <Outlet /> : <Navigate to="/" />;
}

export default AdminPrivateRoutes;
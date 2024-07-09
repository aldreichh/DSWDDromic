import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
    const storedDataString = localStorage.getItem('data');
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;

    const setAuthToken = (token) => {
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    };
    const token = Cookies.get('remember_token');
    setAuthToken(token);
    const isAuthenticated = !!token;
    const isActive = isAuthenticated && storedData && storedData.status === 'Active';

    return isAuthenticated && isActive? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
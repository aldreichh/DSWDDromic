import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PI_Contents() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [provinceName, setProvinceName] = useState(null);

    const setAuthToken = (token) => {
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    };

    const getAccessToken = () => localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true);
        const accessToken = getAccessToken();
        setAuthToken(accessToken);
    
        axios.get("http://127.0.0.1:8000/api/showprofile")
            .then((profileRes) => {
                setUserData(profileRes.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setUserData(null); 
                setIsLoading(false);
            });
    
        axios.get("http://127.0.0.1:8000/api/myprovinces")
            .then((provinceRes) => {
                setProvinceName(provinceRes.data);
            })
            .catch(error => {
                console.error('Error fetching province data:', error);
                setProvinceName(null); 
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const renderUserInfo = () => {
        if (!isLoading && userData) {
            return Object.keys(userData).map(key => {
                const user = userData[key];
                if (user.id) {
                    return (
                        <div key={key} className="mb-1 flex">
                            <div className="w-1/2 pr-4">
                                <br/><br/><br/>
                                <p><strong>Username:</strong> {user.username}</p> <br/>
                                <p><strong>First Name:</strong> {user.firstName}</p> <br/>
                                <p><strong>Last Name:</strong> {user.lastName}</p><br/>
                                <p><strong>Middle Name:</strong> {user.middleName}</p><br/>
                                <p><strong>Email:</strong> {user.email}</p><br/>
                            </div>
                            <div className="w-1/2 pl-4">
                            <br/><br/><br/>
                                <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p> <br/>
                                <p><strong>Role:</strong> {user.role}</p><br/>
                                {provinceName && Object.keys(provinceName).map(k => {
                                    const province = provinceName[k];
                                    if (province.id === user.provinceAssigned) {
                                        return (
                                            <p key={k}><strong>Province Assigned:</strong> {province.name}</p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    );
                }
                return null;
            });
        }
        return <h3>Loading...</h3>;
    };

    return (
        <div className="w-full h-full -mt-4 md:-mt-16 pt-20 pl-4 pr-4 pb-4 flex justify-center md:items-center">
            <div className="w-full bg-white shadow-md md:w-3/4">
                <div className="h-12 bg-sky-600 text-white flex items-center pl-3">
                    <p>Personal Information</p>
                </div>
                <div className="flex">
                    <div className="w-full p-5">
                        {renderUserInfo()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PI_Contents;

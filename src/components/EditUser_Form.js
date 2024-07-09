import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function EditUser_Form ({userData, onClose, provinceIndex}) {
    const [status, setStatus] = useState(userData.status || '');
    const [role, setRole] = useState(userData.role || '');
    const [address, setaddress] = useState(userData.address || '');
    const [firstName, setfirstName] = useState(userData.firstName || '');
    const [lastName, setlastName] = useState(userData.lastName || '');
    const [middleName, setmiddleName] = useState(userData.middleName || '');
    const [userName, setuserName] = useState(userData.userName || '');
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState('');
    const [email, setEmail] = useState(userData.email || '');
    const [dateOfBirth, setdateOfBirth] = useState(userData.dateOfBirth || '');
    const [province, setProvince] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [modal, setModal] = useState(false);
    
    const handleBack = () => {
        window.location.reload();
        setModal(false);
        onClose(); 
    };

    const filteredProvinceData = provinceIndex?.data?.filter(item => item.name) || [];
    const defaultProvinceArray = provinceIndex?.data?.find(item => item.name === userData.provinceAssigned);
    const defaultProvinceID = defaultProvinceArray?.id;

    const handleStatusChange = (value) => {
        setStatus(value.target.value);
    }

    const handleRoleChange = (value) => {
        setRole(value.target.value);
    }

    const handleProvinceChange = (value) => {
        setProvince(value.target.value);
    }

    const handlePassword = (value) => {
        setPassword(value.target.value);
    }

    const handleconfirmPassword = (value) => {
        setconfirmPassword(value.target.value);
    }

    const handleSubmit = async () => {
        try {
            if (password === confirmPassword) {
                let updatePassword = password;
                let provinceAssigned = defaultProvinceID;
                if (!password.trim()) {
                    // If both password and confirmPassword are empty, set updatePassword to an empty string
                    updatePassword = '';
                }
                if (province !== '') {
                    // Set provinceAssigned to the value of province only if province is not null
                    provinceAssigned = province;
                }
                    const requestData = {
                        username: userName,
                        email: email,
                        middleName: middleName,
                        lastName: lastName,
                        firstName: firstName,
                        role: role,
                        address: address,
                        status: status,
                        provinceAssigned: provinceAssigned,
                        DateOfBirth: dateOfBirth,
                    };
    
                    // Only include password if it's not an empty string
                    if (updatePassword !== '') {
                        requestData.password = updatePassword;
                    }
    
                    const response = await axios.put('http://127.0.0.1:8000/api/updateprofile/' + userData.userID, requestData);
                    setModal(true);
            } else {
                seterrorMessage('Password Mismatch.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error(error.response);
            } else {
                console.error(error.response);
            }
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    

    return (
        <>
        <Modal
            open={modal}
                //onClose={handleClickClose}
            >
                <Box style={style}>
                    <div className="p-5  bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center text-green-500 text-3xl font-bold">Success!</p>
                        <p className="flex justify-center mt-2">Changes has been applied.</p>
                    </div>
                    <Button sx={{   width:'100%', 
                                    backgroundColor: '#22c55e', 
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                onClick={handleBack}
                                >
                            Confirm
                    </Button>
                </Box>
        </Modal>
        <div className="h-full bg-white">
        {errorMessage !== '' ? (
            <p className="relative border-2 border-red-300 flex justify-center mt-3 text-red-500 bg-red-200 rounded-lg py-2 mx-2.5">{errorMessage}</p>
             ) : ''}
            <div className="justify-center items-center flex h-full overflow-y-auto bg-white">
                <div className="w-full mx-4 my-4 flex-col">
                    <FormControl fullWidth>
                        <TextField      
                            sx={{marginTop: 2}}
                            value={userName}                  
                            label="Username" 
                            variant="outlined" 
                            disabled
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            value={firstName}
                            sx={{marginTop: 2}}
                            label="First Name" 
                            variant="outlined" 
                            disabled
                        />
                    </FormControl>
                    <FormControl fullWidth>
                    <FormControl fullWidth>
                        <TextField 
                            value={middleName}
                            sx={{marginTop: 2}}
                            label="Middle Name" 
                            variant="outlined" 
                            disabled
                        />
                    </FormControl>
                        <TextField 
                            value={lastName}
                            sx={{marginTop: 2}}
                            label="Last Name" 
                            variant="outlined" 
                            disabled
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            value={email}
                            sx={{marginTop: 2}}
                            label="Email" 
                            variant="outlined" 
                            disabled
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop: 2}}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            label="Role"
                            value={role} 
                            onChange={handleRoleChange} 
                        >
                        <MenuItem value={'User'}>User</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="w-full mx-4 my-4 flex-col">
                    <FormControl fullWidth sx={{marginTop: 2}}>
                        <InputLabel>{userData.provinceAssigned}</InputLabel>
                        <Select
                            label={userData.provinceAssigned}
                            value={province}
                            onChange={handleProvinceChange} 
                        >
                            {filteredProvinceData.map((provinces) => (
                                <MenuItem 
                                    key={provinces.id} 
                                    value={provinces.id}>
                                    {provinces.name}
                                </MenuItem>
                            ))}                          
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            value={dateOfBirth}
                            sx={{marginTop: 2}}
                            label="Date of Birth" 
                            variant="outlined" 
                            disabled
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            disabled
                            value={address}
                            sx={{marginTop: 2}}
                            label="Address" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            type="password"
                            value={password}
                            onChange={handlePassword}
                            sx={{marginTop: 2}} 
                            label="New Password" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            type="password"
                            onChange={handleconfirmPassword}
                            value={confirmPassword}
                            sx={{marginTop: 2}}
                            label="Confirm Password" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop: 2}}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            value={status} 
                            onChange={handleStatusChange} 
                        >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="flex justify-center bg-white px-2 py-4">
                <Button 
                    onClick={handleBack}
                    sx={{
                    backgroundColor: '#f87171',
                    '&:hover': {
                        backgroundColor: '#ef4444',
                        boxShadow: 'none', 
                    }, }}    
                    variant="contained">
                    Back
                </Button>
                <Button     
                    onClick={handleSubmit}
                    sx={{ color:'white', marginLeft: 2,
                    backgroundColor:'#22c55e', 
                    '&:hover': {
                        backgroundColor: '#16a34a',
                        boxShadow: 'none', 
                    }, }} 
                    variant="contained">
                    Apply Changes
                </Button>
            </div>
        </div>
        </>
    );
}

export default EditUser_Form;
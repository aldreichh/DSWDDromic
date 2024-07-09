import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Create_User ({onClose, provinceIndex, users}) {
    const [username, setUsername] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [middleName, setmiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [provinceAssigned, setprovinceAssigned] = useState('');
    const [dateOfBirth, setdateOfBirth] = useState(dayjs());
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [modal, setModal] = useState(false);
    const [dateOfBirthDisplay, setdateOfBirthDisplay] = useState(dayjs().format('YYYY-MM-DD'));

    const filteredProvinceData = provinceIndex?.data?.filter(item => item.name) || [];

    const handleUsernameChange = (value) => {
        setUsername(value.target.value);
    }                                   
    const handlefirstNameChange = (value) => {
        setfirstName(value.target.value);
    }
    const handlemiddleNameChange = (value) => {
        setmiddleName(value.target.value);
    }
    const handlelastNameChange = (value) => {
        setlastName(value.target.value);
    }
    const handleEmailChange = (value) => {
        setEmail(value.target.value);
    }
    const handleRoleChange = (value) => {
        setRole(value.target.value);
    }
    const handleProvincAssignedChange = (value) => {
        setprovinceAssigned(value.target.value);
    }
    const handleAddressChange = (value) => {
        setAddress(value.target.value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value.target.value);
    }
    const handleConfirmPasswordChange = (value) => {
        setconfirmPassword(value.target.value);
    }
    const handleStatusChange = (value) => {
        setStatus(value.target.value);
    }
    const handledateOfBirth = (date) => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        setdateOfBirthDisplay(formattedDate);
        setdateOfBirth(date);
    }

    const handleBack = () => {
        onClose();
    }

    const handleConfirm = () =>{
        onClose();
        window.location.reload();
    }

    const isValidEmail = (email) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if( username && 
            firstName && 
            lastName && 
            email &&
            isValidEmail(email) &&
            role &&
            provinceAssigned &&
            dateOfBirth &&
            address &&
            password &&
            confirmPassword &&
            status ){
            let passwordData;
            const isUsernameExists = users.some(user => user.username === username);
            if (isUsernameExists) {
                seterrorMessage('Username already exists. Please choose a different username.');
                return;
            }
            if(password === confirmPassword){
                passwordData = password;
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/createuser', {
                        username: username,
                        email: email,
                        password: passwordData,
                        firstName: firstName,
                        lastName: lastName,
                        middleName: middleName,
                        address: address,
                        dateOfBirth: dateOfBirthDisplay,
                        role: role,
                        provinceAssigned: provinceAssigned
                    });
                    setModal(true);
                    
                } catch (error) {
                    console.error('Error Response:', error.response);
                    console.log(error.response.data.message);
                    if (error.response && error.response.status === 422) {
                        console.log('Validation Errors:', error.response.data.errors);
                    }
                }
            }
            else{
                seterrorMessage('Password Mismatch.')
            }
        }
        else if(!username){
            seterrorMessage('Username cannot be blank.');
        }
        else if(!firstName){
            seterrorMessage('First Name cannot be blank.');
        }
        else if(!lastName){
            seterrorMessage('Last Name cannot be blank.');
        }
        else if(!email){
            seterrorMessage('Email cannot be blank.');
        }
        else if(!role){
            seterrorMessage('Role cannot be blank.')
        }
        else if(!provinceAssigned){
            seterrorMessage('Province Assigned cannot be blank.')
        }
        else if(!dateOfBirth){
            seterrorMessage('Date of Birth cannot be blank.')
        }
        else if(!address){
            seterrorMessage('Address cannot be blank.')
        }
        else if(!password){
            seterrorMessage('Password cannot be blank.')
        }
        else if(!confirmPassword){
            seterrorMessage('Confirm Password cannot be blank.')
        }
        else if(!status){
            seterrorMessage('Status cannot be blank.')
        }
        else if(!isValidEmail(email)){
            seterrorMessage('Email Address is invalid.')
        }
    }
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
                        <p className="flex justify-center mt-2">New account has been created.</p>
                    </div>
                    <Button sx={{   width:'100%', 
                                    backgroundColor: '#22c55e', 
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                onClick={handleConfirm}
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
                            value={username} 
                            onChange={handleUsernameChange}                 
                            label="Username" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            value={firstName}
                            onChange={handlefirstNameChange}
                            sx={{marginTop: 2}}
                            label="First Name" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                    <FormControl fullWidth>
                        <TextField                     
                            value={middleName}
                            onChange={handlemiddleNameChange}
                            sx={{marginTop: 2}}
                            label="Middle Name" 
                            variant="outlined" 
                        />
                    </FormControl>
                        <TextField 
                            value={lastName}
                            onChange={handlelastNameChange}
                            sx={{marginTop: 2}}
                            label="Last Name" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            value={email}
                            onChange={handleEmailChange}
                            sx={{marginTop: 2}}
                            label="Email" 
                            variant="outlined" 
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
                        <InputLabel>Province Assigned</InputLabel>
                        <Select
                            label="Province Assigned"
                            value={provinceAssigned}
                            onChange={handleProvincAssignedChange} 
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                sx={{marginTop: 2}}
                                value={dateOfBirth}
                                onChange={handledateOfBirth}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            value={address}
                            onChange={handleAddressChange}
                            sx={{marginTop: 2}}
                            label="Address" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            sx={{marginTop: 2}} 
                            label="New Password" 
                            variant="outlined" 
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                            type="password"
                            onChange={handleConfirmPasswordChange}
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

export default Create_User;
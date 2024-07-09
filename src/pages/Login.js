import backgroundimg from '../assets/login-image.png';
import dswdlogo from '../assets/dswd-logo.png';
import bagongpilipinaslogo from '../assets/bagongpilipinas-logo.png';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const setAuthToken = (token) => {
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    };

    const loginButton = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username,
                password,
                remember_me: rememberMe,
            });
            const token = response.data.token;
            const data = response.data.data;
            if(data.status === 'Inactive'){
                setErrorMessage('This account is Inactive.')
            }
            else if (!data.provinceAssigned && data.role === 'User') {
                setErrorMessage("This account doesn't have a Province assigned.");
            }
            else{
                setAuthToken(token);
                const dataString = JSON.stringify(data);
                localStorage.setItem('data', dataString);
                localStorage.setItem('token', token);
                localStorage.setItem('rememberMe', rememberMe);
                const cookieOptions = rememberMe ? { expires: 14 } : {};
                Cookies.set('remember_token', token, cookieOptions);
                navigate('/data_visualization');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Login failed: Wrong credentials');
                setErrorMessage('Incorrect username or password. Please try again.');
            } else {
                console.error('Login failed', error);
                if (username === '' && password === '') {
                    setErrorMessage('Incorrect username or password. Please try again.');
                } else if (username && password === '') {
                    setErrorMessage('Incorrect username or password. Please try again.');
                } else if (username === '' && password) {
                    setErrorMessage('Incorrect username or password. Please try again.');
                } else {
                    setErrorMessage('An unknown error has occurred.');
                }
            }
        }
    };

    const getUsername = (e) => {
        setUsername(e.target.value);
    };

    const getPassword = (e) => {
        setPassword(e.target.value);
    };

    return(
        <>
        <div className="h-screen flex items-center justify-center bg-slate-200">
            <div className="grid grid-cols-11 h-3/4 w-3/4 shadow-2xl">
                <div className="col-span-6 hidden xl:block bg-sky-600"
                
                    style={{
                        backgroundImage: `url(${backgroundimg})`,
                        backgroundSize: '90% 90%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    >

                </div>
                <div className="col-span-11 xl:col-span-5 bg-white flex justify-center">
                    <div className="w-10/12 h-full flex flex-col justify-center items-center">
                        <div className="flex justify-center block md:hidden mt-10">   
                            <img className="w-1/6 " src={dswdlogo} alt="logo"/>
                            <img className="w-1/6" src={bagongpilipinaslogo} alt="blogo"/>
                        </div>                       
                        <div className="w-10/12 flex items-center justify-center mb-12 md:mb-20">
                            <img className="w-1/6 hidden md:block" src={dswdlogo} alt="logo"/>
                            <p className="text-5xl font-main font-black text-indigo-800 md:text-6xl">DROMIC</p>
                            <img className="w-1/6 hidden md:block" src={bagongpilipinaslogo} alt="blogo"/>
                        </div>
                        <p className=" w-10/12 text-3xl mb-5">
                            <span className="text-red-400 font-bold">Sign in</span> to your account
                        </p>
                        <Box  sx={{ display: 'flex', alignItems: 'flex-end', m: 1, width: '83%'  }}>
                            <PersonIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                            <TextField onChange={getUsername} sx={{ color:'black',width: '100%' }} id="get-username" label="Username" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 2, width: '83%'   }}>
                            <LockIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                            <FormControl sx={{ width: '100%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                sx={{ color: 'black'}}
                                onChange={getPassword}
                                id="get-password"
                                type="password"
                            />
                            </FormControl>
                        </Box>
                        <FormGroup className="w-10/12 ml-2">
                            <FormControlLabel control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} defaultunChecked />} label="Remember me" />
                        </FormGroup>
                        <div>
                            <p className="text-red-600 mt-5">{errorMessage}</p>
                        </div>
                        <div className="w-full flex justify-center items-center mt-16">
                            <Button onClick={loginButton} className="w-1/2 rounded-lg h-11 font-main" variant="contained">Login</Button>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        </>
    )
}

export default Login;



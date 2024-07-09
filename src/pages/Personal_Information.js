import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PI_Contents from '../components/PI_Contents';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const drawerWidth = 255;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Data_Visualization() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    const dataVisualizationHandler = () => {
        // navigate to data visualization page / reload page
        navigate('/data_visualization');
    }

    const visualPresentationHandler = () => {
        navigate('/presentation');
    }

    const dataManagementHandler = () => {
        // navigate to data management page
        navigate('/data_management');
    }

    const userManagementHandler = () => {
        // navigate to user management page
        navigate('/user_management');
    }

    const personalInformationHandler = () => {
        // navigate to personal information page
    }
    const storedDataString = localStorage.getItem('data');
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const isAdmin = storedData && storedData.role !== 'Admin';
    const isUser = storedData && storedData.role !== 'User';


    const handleModalOpen = () => {
        setModal(true);
    }

    const handleModalClose = () => {
        setModal(false);
    }

    const logoutHandler = async  () => {
        //navigate to login page
        try {
            await axios.post('http://127.0.0.1:8000/api/logout');
            if (Cookies.get('remember_token')) {
                Cookies.remove('remember_token');
            }
            localStorage.removeItem('data');
            localStorage.removeItem('token');
            localStorage.removeItem('rememberMe');
    
            navigate('/');
        } catch (error) {
            console.log(error.response);
        }
    }

    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '30%',
        bgcolor: 'white',
        boxShadow: 10,
        borderRadius: 0, 
        '@media (min-width: 768px)': {
            height: '25%',
            width: '25%', 
        },
    };

    return (
    <>
        <Modal
            open={modal}
            >
                <Box style={style2}>
                    <div className="p-5 bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center  text-3xl font-bold">Confirm logout</p>
                        <p className="flex justify-center mt-2">Are you sure you want to log out?</p>
                    </div>
                    <Button sx={{   width:'50%', 
                                    backgroundColor: '#f87171', 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#ef4444',
                                        boxShadow: 'none', 
                                        borderRadius: 0, 
                                }, }} 
                                onClick={handleModalClose}
                            >
                            Cancel
                    </Button>
                    <Button sx={{   width:'50%', 
                                    backgroundColor: '#22c55e', 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#16a34a',
                                        boxShadow: 'none', 
                                        borderRadius: 0, 
                                }, }} 
                                onClick={logoutHandler}
                            >
                            Confirm
                    </Button>
                </Box>
        </Modal>
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ backgroundColor: '#0284c7' }}>
                    <Toolbar
                        sx={{
                        pr: '24px', // keep right padding when drawer closed
                        }}
                        >
                        <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                            >
                            Personal Information
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        }}
                        >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <List sx={style} component="nav" aria-label="mailbox folders">
                    {open ? (
                        <>
                        <ListItem  button onClick={dataVisualizationHandler}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Data Visualization" />
                        </ListItem>
                        <Divider />
                        
                        {!isAdmin && (
                        <ListItem button divider onClick={visualPresentationHandler}> 
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <RemoveRedEyeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Visual Presentation" />
                        </ListItem>
                        )}
                        <ListItem button divider onClick={dataManagementHandler}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Data Management" />
                        </ListItem>
                        {!isAdmin && (
                            <ListItem button divider onClick={userManagementHandler}> 
                                <ListItemIcon sx={{ color: '#0284c7' }}>
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText primary="User Management" />
                            </ListItem>
                        )}
                        <ListItem sx={{ backgroundColor: '#0284c7',
                                        '&:hover': {
                                        backgroundColor: '#239ddb',
                                        },
                                    }}  button divider onClick={personalInformationHandler}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white' }} primary="Personal Information" />
                        </ListItem>
                        <ListItem button onClick={handleModalOpen}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItem>
                        </>
                    ) : (
                        <>
                        <ListItem button onClick={dataVisualizationHandler}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Data Visualization" />
                        </ListItem>
                        <Divider />
                        {!isAdmin && (           
                        <ListItem button divider onClick={visualPresentationHandler}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <RemoveRedEyeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Visual Presentation" />
                        </ListItem>  
                        )}
                        <ListItem button divider onClick={dataManagementHandler}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Data Management" />
                        </ListItem>
                        {!isAdmin && (
                            <ListItem button divider onClick={userManagementHandler}>
                                <ListItemIcon sx={{ color: '#0284c7' }}>
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText primary="User Management" />
                            </ListItem>  
                        )}            
                        <ListItem sx={{ backgroundColor: '#0284c7',
                                        '&:hover': {
                                        backgroundColor: '#239ddb',
                                        },
                                    }} button divider onClick={personalInformationHandler}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white' }} primary="Personal Information" />
                        </ListItem>
                        <ListItem button onClick={handleModalOpen}>
                            <ListItemIcon sx={{ color: '#0284c7' }}>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItem>
                        </>      
                    )}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                    backgroundColor: '#e2e8f0',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <PI_Contents/>
                </Box>
            </Box>
        </ThemeProvider>
    </>
  );
}
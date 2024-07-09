import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddBarangay ({citiesIndex}) {
    const [barangay, setBarangay] = useState('');
    const [citiesID, setcitiesID] = useState('');
    const [modal, setModal] = useState(false);
    
    const handleBarangayChange = (value) => {
        setBarangay(value.target.value);
    }

    const citiesChangeHandler = (value) => {
        setcitiesID(value.target.value);
    }

    const handleModalClose = () => {
        setModal(false);
        window.location.reload();
    }
    
    const filteredMunicipalitiesData = citiesIndex?.data?.filter(item => item.name) || [];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '30%',
        bgcolor: 'white',
        boxShadow: 10,
        '@media (min-width: 768px)': {
            height: '25%',
            width: '25%', 
          },
    };
    const submit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/adminaddbarangays', {
                name: barangay,
                citiesID: citiesID,
            });
            setModal(true);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
            }
        }
    };
    return (
    <>
        <Modal
            open={modal}
            >
                <Box style={style}>
                    <div className="p-5  bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center text-green-500 text-3xl font-bold">Success!</p>
                        <p className="flex justify-center mt-2">Data has been added successfully</p>
                    </div>
                    <Button sx={{   width:'100%', 
                                    backgroundColor: '#22c55e', 
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                onClick={handleModalClose}
                                >
                            Confirm
                    </Button>
                </Box>
        </Modal>
         <div className="h-full w-full flex justify-center items-center p-4">
                <TextField
                    value={barangay}
                    onChange={handleBarangayChange}
                    label="Barangay Name"
                    variant="outlined"
                />
                <FormControl fullWidth sx={{marginLeft: 1, marginRight: 1}}>
                        <InputLabel>Municipality Assigned</InputLabel>
                        <Select
                            label="Municipality Assigned"
                            value={citiesID}
                            onChange={citiesChangeHandler}
                        >
                            {filteredMunicipalitiesData.map((municipalities) => (
                                <MenuItem 
                                    key={municipalities.id} 
                                    value={municipalities.id}>
                                    {municipalities.name}
                                </MenuItem>
                            ))}     
                        </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    onClick={submit}
                >
                    Add
                </Button>
            </div>
    </>
    );
}

export default AddBarangay;
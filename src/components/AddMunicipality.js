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

function AddMunicipality ({provinceIndex}) {
    const [municipality, setmunicipality] = useState('');
    const [provinceAssigned, setprovinceAssigned] = useState('');
    const [modal, setModal] = useState('');

    const handleMunicipalityChange = (value) => {
        setmunicipality(value.target.value);
    }

    const provinceChangeHandler = (value) => {
        setprovinceAssigned(value.target.value);
    }

    const handleModalClose = () => {
        setModal(false);
        window.location.reload();
    }

    const filteredProvinceData = provinceIndex?.data?.filter(item => item.name) || [];

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
            const response = await axios.post('http://127.0.0.1:8000/api/adminaddcities', {
                name: municipality,
                provincesID: provinceAssigned,
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
                    value={municipality}
                    onChange={handleMunicipalityChange}
                    label="Municipality Name"
                    variant="outlined" 
                />
                <FormControl fullWidth sx={{marginLeft: 1, marginRight: 1}}>
                        <InputLabel>Province Assigned</InputLabel>
                        <Select
                            label="Province Assigned"
                            value={provinceAssigned}
                            onChange={provinceChangeHandler}
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

export default AddMunicipality;
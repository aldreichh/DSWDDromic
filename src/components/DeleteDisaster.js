import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function DeleteDisaster({disasters}) {
    const [disaster, setDisaster] = useState('');
    const [disasterID, setdisasterID] = useState('');
    const [modal, setModal] = useState(false);
    const [confirmModal, setconfirmModal] = useState(false);

    const handleModalClose = () => {
        setModal(false);
        window.location.reload();
    }

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

    const filteredDisasterData = disasters?.data?.filter(item => item.disasterName) || [];

    const disasterhandleChange = (event) => {
        setDisaster(event.target.value);
        const matchingDisaster = filteredDisasterData.find(
            d => d.disasterName === event.target.value
        );
        setdisasterID(matchingDisaster.id);
    };

    const handleConfirm = () => {
        setconfirmModal(true);
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/deletedisaster/${disasterID}`);
            setModal(true);
            setDisaster('');
        } catch (error) {
            console.error('Error deleting disaster:', error);
        }
    };

    return (
    <>
        <Modal
            open={confirmModal}
            >
                <Box style={style}>
                    <div className="p-5  bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center text-3xl font-bold">Confirm Deletion</p>
                        <p className="flex justify-center mt-2">Are you sure you want to delete this data? It might remove all the assigned reports.</p>
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
                                onClick={handleDelete}
                            >
                            Confirm
                    </Button>
                </Box>
        </Modal>
        <Modal
            open={modal}
            >
                <Box style={style}>
                    <div className="p-5  bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center text-green-500 text-3xl font-bold">Success!</p>
                        <p className="flex justify-center mt-2">Data has been deleted successfully</p>
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
            <FormControl sx={{ m: 1, width: '98%' }}>        
                <InputLabel>Disaster</InputLabel>                         
                <Select
                    label="Disaster"
                    value={disaster}
                    onChange={disasterhandleChange}
                >
                    {filteredDisasterData.map((item) => (
                        <MenuItem
                            key={`${item.disasterName}-${item.id}`}
                            value={item.disasterName}
                        >
                            {item.disasterName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button 
                onClick={handleConfirm}
                variant="outlined">
                Delete
            </Button>               
        </div>
    </>
    );
}

export default DeleteDisaster;

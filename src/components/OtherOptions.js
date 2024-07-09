import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddBarangay from './AddBarangay';
import AddDisaster from './AddDisaster';
import AddProvince from './AddProvince';
import AddMunicipality from './AddMunicipality';
import DeleteDisaster from './DeleteDisaster';
import DeleteProvince from './DeleteProvince';
import DeleteBarangay from './DeleteBarangay';
import DeleteMunicipality from './DeleteMunicipality';

function OtherOptions ({provinceIndex, citiesIndex, barangayIndex, disasters}) {
    const [addDisasterModal, setaddDisasterModal] = useState(false);
    const [addProvinceModal, setaddProvinceModal] = useState(false);
    const [addMunicipalityModal, setaddMunicipalityModal] = useState(false);
    const [addBarangayModal, setaddBarangayModal] = useState(false);
    const [deleteDisasterModal, setdeleteDisasterModal] = useState(false);
    const [deleteProvinceModal, setdeleteProvinceModal] = useState(false);
    const [deleteMunicipalityModal, setdeleteMunicipalityModal] = useState(false);
    const [deleteBarangayModal, setdeleteBarangayModal] = useState(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '70%',
        bgcolor: 'white',
        boxShadow: 10,
        '@media (min-width: 768px)': {
            height: '20%',
            width: '20%', 
          },
    };

    const handleModalClose = () => {
        setaddDisasterModal(false);
        setaddProvinceModal(false);
        setaddMunicipalityModal(false);
        setaddBarangayModal(false);
        setdeleteDisasterModal(false);
        setdeleteProvinceModal(false);
        setdeleteMunicipalityModal(false);
        setdeleteBarangayModal(false);
    }

    const handleAddDisasterData = () => {
        setaddDisasterModal(true);
    }

    const handleAddProvinceData = () => {
        setaddProvinceModal(true);
    }

    const handleAddMunicipalityData = () => {
        setaddMunicipalityModal(true);
    }

    const handleAddBarangayData = () => {
        setaddBarangayModal(true);
    }

    const handleDeleteDisasterData = () => {
        setdeleteDisasterModal(true);
    }
    
    const handleDeleteProvinceData = () => {
        setdeleteProvinceModal(true);
    }

    const handleDeleteMunicipalityData = () => {
        setdeleteMunicipalityModal(true);
    }

    const handleDeleteBarangayData = () => {
        setdeleteBarangayModal(true);
    }

    return (
        <>
        <Modal open={addDisasterModal} onClose={handleModalClose}>
            <Box sx={style}>
                <AddDisaster/>
            </Box>
        </Modal>
        <Modal open={addProvinceModal} onClose={handleModalClose}>
            <Box sx={style}>
                <AddProvince/>
            </Box>
        </Modal>
        <Modal open={addMunicipalityModal} onClose={handleModalClose}>
            <Box sx={style}>
                <AddMunicipality provinceIndex={provinceIndex}/>
            </Box>
        </Modal>
        <Modal open={addBarangayModal} onClose={handleModalClose}>
            <Box sx={style}>
                <AddBarangay citiesIndex={citiesIndex}/>
            </Box>
        </Modal>
        <Modal open={deleteDisasterModal} onClose={handleModalClose}>
            <Box sx={style}>
                <DeleteDisaster disasters={disasters}/>
            </Box>
        </Modal>
        <Modal open={deleteProvinceModal} onClose={handleModalClose}>
            <Box sx={style}>
            <DeleteProvince provinceIndex={provinceIndex}/>
            </Box>
        </Modal>
        <Modal open={deleteMunicipalityModal} onClose={handleModalClose}>
            <Box sx={style}>
            <DeleteMunicipality citiesIndex={citiesIndex}/>
            </Box>
        </Modal>
        <Modal open={deleteBarangayModal} onClose={handleModalClose}>
            <Box sx={style}>
            <DeleteBarangay barangayIndex={barangayIndex}/>
            </Box>
        </Modal>
        <div className="flex-col flex justify-center items-center h-full bg-sky-600">
            <Button
                onClick={handleAddDisasterData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                    
                }, }}     
            >   ADD DISASTER DATA
            </Button>
            <Button
                onClick={handleAddProvinceData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                   
                }, }}     
            >   ADD PROVINCE DATA
            </Button>
            <Button
                onClick={handleAddMunicipalityData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                   
                }, }}     
            >   ADD MUNICIPALITY DATA
            </Button>
            <Button
                onClick={handleAddBarangayData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                    
                }, }}     
            >   ADD BARANGAY DATA
            </Button>
            <Button
                onClick={handleDeleteDisasterData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                    
                }, }}     
            >   DELETE DISASTER DATA
            </Button>
            <Button
                onClick={handleDeleteProvinceData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                    
                }, }}     
            >   DELETE PROVINCE DATA
            </Button>
            <Button
                onClick={handleDeleteMunicipalityData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',                   
                }, }}     
            >   DELETE MUNICIPALITY DATA
            </Button>
            <Button
                onClick={handleDeleteBarangayData}
                variant='contained'
                sx={{
                boxShadow: 'none', 
                overflow: 'hidden',
                height: '30%',
                width: '100%',
                backgroundColor: ' #0284c7',
                '&:hover': {
                backgroundColor: '#0c4a6e',             
                }, }}     
            >   DELETE BARANGAY DATA
            </Button>
        </div>
        </>
    );
}

export default OtherOptions;
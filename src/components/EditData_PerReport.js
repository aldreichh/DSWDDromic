import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';

const customHeightStyle1 = {
    height: '7%'
}

const customHeightStyle2 = {
    height: '93%'
}

const customHeightStyle3 = {
    height: '90%'
}

const customHeightStyle4 = {
    height: '10%'
}

function EditData_PerReport (
    {
        reportID, 
        reportDetails, 
        disasterName, 
        timeOfIncident, 
        dateOfIncident, 
        disasters, 
        provinceIndex,
        citiesIndex, 
        barangayIndex, 
        contents
    }) {
    const [reportType, setreportType] = useState('Progress')
    const [provinceName, setProvinceName] = useState(contents.provinceName);
    const [municipalityName, setMunicipalityName] = useState(contents.municipalityName);
    const [barangayName, setBarangayName] = useState(contents.barangayName);
    const [displacedFamiliesInsideEC, setdisplacedFamiliesInsideEC] = useState(contents.displacedFamiliesInsideEC || 0);
    const [displacedFamiliesOutsideEC, setdisplacedFamiliesOutsideEC] = useState(contents.displacedFamiliesOutsideEC || 0);
    const [totalServedNumberFamilies, settotalServedNumberFamilies] = useState(contents.totalServedNumberFamilies || 0);
    const [totalServedNumberPersons, settotalServedNumberPersons] = useState(contents.totalServedNumberPersons || 0);
    const [damagedHousesTotally, setdamagedHousesTotally] = useState(contents.damagedHousesTotally || 0);
    const [damagedHousesPartially, setdamagedHousesPartially] = useState(contents.damagedHousesPartially || 0);
    const [costOfAssistanceDSWD, setcostOfAssistanceDSWD] = useState(contents.costOfAssistanceDSWD || 0);
    const [costOfAssistanceLGUAffected, setcostOfAssistanceLGUAffected] = useState(contents.costOfAssistanceLGUAffected || 0);
    const [costOfAssistanceLGUDonor, setcostOfAssistanceLGUDonor] = useState(contents.costOfAssistanceLGUDonor || 0);
    const [costOfAssistanceNGO, setcostOfAssistanceNGO] = useState(contents.costOfAssistanceNGO || 0);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [reportedBy, setreportedBy] = useState(contents.reportedBy);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessageModal, seterrorMessageModal] = useState('');
    const [terminalChecker, setTerminalChecker] = useState(false);

    const handlereportType = (value) => {
        setreportType(value.target.value);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    const handlereportedByChange = (value) => {
        setreportedBy(value.target.value);
    }

    const handleDisplacedFamiliesInsideEC = (value) => {
        setdisplacedFamiliesInsideEC(value.target.value);
    }
    const handleDisplacedFamiliesOutsideEC = (value) => {
        setdisplacedFamiliesOutsideEC(value.target.value);
    }
    const handleTotalServedNumberFamilies = (value) => {
        settotalServedNumberFamilies(value.target.value);
    }
    const handleTotalServedNumberPersons = (value) => {
        settotalServedNumberPersons(value.target.value);
    }
    const handleDamagedHousesTotally = (value) => {
        setdamagedHousesTotally(value.target.value);
    }
    const handleDamagedHousesPartially = (value) => {
        setdamagedHousesPartially(value.target.value);
    }
    const handleCostOfAssistanceDSWD = (value) => {
        setcostOfAssistanceDSWD(value.target.value);
    }
    const handleCostOfAssistanceLGUAffected = (value) => {
        setcostOfAssistanceLGUAffected(value.target.value);  
    }
    const handleCostOfAssistanceLGUDonor = (value) => {
        setcostOfAssistanceLGUDonor(value.target.value);      
    }
    const handleCostOfAssistanceNGO = (value) => {
        setcostOfAssistanceNGO(value.target.value);
    }
    console.log(disasterName)
    const storedDataString = localStorage.getItem('data');
    const storedData = JSON.parse(storedDataString);
    const employeeID = storedData.id
    
    const disasterID = disasters?.filter(item => item.disasterName === disasterName) || [];
    const provinceSelectedID = provinceIndex?.data?.filter(item => item.name === provinceName) || [];
    const municipalitySelectedID = citiesIndex?.data?.filter(item => item.name === municipalityName) || [];
    const barangaySelectedID = barangayIndex?.data?.filter(item => item.name === barangayName) || [];
    const handleSubmit = async () => {
        if(!municipalityName){
            setErrorMessage('Please fill in the Municipality field.');
        }
        else if(!barangayName){
            setErrorMessage('Please fill in the Barangay field.');
        }
        else{
            let reportTypeID;
            if(reportType === 'Progress'){
                reportTypeID = 'Progress';
            }
            else{
                reportTypeID = 'Terminal';
            }
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/updatereport/${contents.id}`,  {
                    disasterID: disasterID[0].id,
                    provincesID: provinceSelectedID[0].id,
                    citiesID: municipalitySelectedID[0].id,
                    barangaysID: barangaySelectedID[0].id,
                    reportType: reportTypeID,
                    employeeID: employeeID,
                    displacedFamiliesInsideEC: displacedFamiliesInsideEC,
                    displacedFamiliesOutsideEC: displacedFamiliesOutsideEC,
                    totalServedNumberFamilies: totalServedNumberFamilies,
                    totalServedNumberPersons: totalServedNumberPersons,
                    damagedHousesTotally: damagedHousesTotally,
                    damagedHousesPartially: damagedHousesPartially,
                    costOfAssistanceDSWD: costOfAssistanceDSWD,
                    costOfAssistanceLGUAffected: costOfAssistanceLGUAffected,
                    costOfAssistanceLGUDonor: costOfAssistanceLGUDonor,
                    costOfAssistanceNGO: costOfAssistanceNGO,
                });
                if(reportTypeID === 3){
                    setTerminalChecker(true);
                    handleResetData();
                    handleClickOpen();
                    setErrorMessage('');
                }
                else{
                    handleResetData();
                    handleClickOpen();
                    setErrorMessage('');
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        seterrorMessageModal('Only users can submit a report.');
                        setErrorModal(true);
                    } else {
                        console.error('Response Status:', error.response.status);
                        console.error('Response Data:', error.response.data);
                        console.error('Response Headers:', error.response.headers);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No Response from Server');
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Request Error:', error.message);
                    console.log(error.response)
                }
            }
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
    const handleClickClose = () => {
        handleResetData();
        setErrorModal(false);
        setOpen(false);
        window.location.reload();
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleResetData = () => {
        setreportType('Progress');
        setdisplacedFamiliesInsideEC('');
        setdisplacedFamiliesOutsideEC('');
        settotalServedNumberFamilies('');
        settotalServedNumberPersons('');
        setdamagedHousesPartially('');
        setdamagedHousesTotally('');
        setcostOfAssistanceDSWD('');
        setcostOfAssistanceLGUAffected('');
        setcostOfAssistanceLGUDonor('');
        setcostOfAssistanceNGO('');
    }
    return (
        <>
        <Modal
                open={errorModal}
               
            >
                <Box style={style}>
                    <div className="p-5 bg-white shadow-md flex-col justify-center">
                        <p className="flex justify-center text-red-400 text-3xl font-bold">Failed!</p>
                        <p className="flex justify-center mt-2">{errorMessageModal}</p>
                    </div>
                    <Button sx={{   width:'100%', 
                                    backgroundColor: '#f87171', 
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: '#dc2626',
                                    boxShadow: 'none', 
                                }, }} 
                                onClick={handleClickClose}
                                >
                            Continue
                    </Button>
                </Box>
            </Modal>
        <Modal
                open={open}     
            >
                <Box style={style}>
                    <div className="p-5  bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center text-green-500 text-3xl font-bold">Success!</p>
                        <p className="flex justify-center mt-2">Report has been updated successfully.</p>
                    </div>
                    <Button sx={{   width:'100%', 
                                    backgroundColor: '#22c55e', 
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                onClick={handleClickClose}
                                >
                            Continue
                    </Button>
                </Box>
        </Modal>
        <div className="w-full md:mr-2 h-full bg-white shadow-md">
                <div style={customHeightStyle1} className="bg-sky-600 flex-col p-2 items-center text-white overflow-hidden">
                    <p>Report: {reportID}</p>
                    <p className="overflow-hidden">{reportDetails}</p>
                </div>
                <div style={customHeightStyle2} className="">
                    <div style={customHeightStyle3} className="w-full flex flex-col justify-center items-center">
                        <div className="h-full mt-2 w-full pr-2 pl-2 overflow-y-auto pb-3">   
                        <Box sx={{ width: '100%', marginTop: '10px' }}>
                                {errorMessage !== '' ? (
                                    <p className="mb-5 border-2 border-red-300 flex justify-center mt-3 text-red-500 bg-red-200 rounded-lg py-2 mx-2.5">{errorMessage}</p>
                                    ) : ''}
                                <FormControl sx={{ m: 1, marginTop: 0, width: '98%' }}>
                                    <InputLabel>Report Type</InputLabel>
                                    <Select
                                        label="Report Type"
                                        value={reportType}
                                        onChange={handlereportType}
                                    >
                                        <MenuItem value={'Progress'}>Progress</MenuItem>
                                        <MenuItem value={'Terminal'}>Terminal</MenuItem>
                                    </Select>
                                </FormControl>     
                                 
                                <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                    <InputLabel>Municipality</InputLabel>
                                    <Select
                                        value={municipalityName}
                                        input={<OutlinedInput label="Municipality" />}
                                        disabled
                                    >
                                        <MenuItem value={contents.municipalityName}>{contents.municipalityName}</MenuItem>
                                    </Select>
                                </FormControl>      
                                <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                    <InputLabel>Barangay</InputLabel>
                                    <Select
                                        value={barangayName}
                                        input={<OutlinedInput label="Barangay" />}
                                        disabled
                                    >
                                        <MenuItem value={contents.barangayName}>{contents.barangayName}</MenuItem>
                                    </Select>
                                </FormControl>   
                                <TextField
                                    value={reportedBy}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Reported By"
                                    disabled
                                    onChange={handlereportedByChange}
                                />               
                                <TextField
                                    value={displacedFamiliesInsideEC}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Displaced Families Inside EC"
                                    type="number"
                                    onChange={handleDisplacedFamiliesInsideEC}
                                />
                                <TextField
                                    value={displacedFamiliesOutsideEC}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Displaced Families Outside EC"
                                    type="number"
                                    onChange={handleDisplacedFamiliesOutsideEC}
                                />
                                <TextField
                                    value={totalServedNumberFamilies}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Total Served Number Families"
                                    type="number"
                                    onChange={handleTotalServedNumberFamilies}
                                />  
                                <TextField
                                    value={totalServedNumberPersons}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Total Served Number Persons"
                                    type="number"
                                    onChange={handleTotalServedNumberPersons}
                                />  
                                <TextField
                                    value={damagedHousesTotally}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Damaged Houses Totally"
                                    type="number"
                                    onChange={handleDamagedHousesTotally}
                                />    
                                <TextField
                                    value={damagedHousesPartially}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Damaged Houses Partially"
                                    type="number"
                                    onChange={handleDamagedHousesPartially}
                                />       
                                <TextField
                                    value={costOfAssistanceDSWD}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Cost Of Assistance (DSWD)"
                                    type="number"
                                    onChange={handleCostOfAssistanceDSWD}
                                />       
                                <TextField
                                    value={costOfAssistanceLGUAffected}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Cost Of Assistance (LGU Affected)"
                                    type="number"
                                    onChange={handleCostOfAssistanceLGUAffected}
                                />      
                                <TextField
                                    value={costOfAssistanceLGUDonor}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Cost Of Assistance (LGU Donor)"
                                    type="number"
                                    onChange={handleCostOfAssistanceLGUDonor}
                                />         
                                <TextField
                                    value={costOfAssistanceNGO}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Cost Of Assistance (NGO)"
                                    type="number"
                                    onChange={handleCostOfAssistanceNGO}
                                />              
                            
                         </Box>                                      
                        </div>
                    </div>
                    <div style={customHeightStyle4} className="w-full border-t-2 flex justify-center items-center overflow-hidden">
                        <Button
                                onClick={handleResetData}
                                sx={{ mr: 3 , px: 2,
                                color:'white',
                                backgroundColor: '#ef4444',
                                '&:hover': {
                                    backgroundColor: '#dc2626',
                                    boxShadow: 'none', 
                                }, }}                          
                            >
                            Clear All Data
                        </Button>
                        <Button  
                                onClick={handleSubmit}
                                sx={{ color:'white', px: 2,
                                backgroundColor:'#22c55e', 
                                '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                >
                            Submit Data
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditData_PerReport;
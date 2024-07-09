import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel'
import DisplayData from './DisplayData';
import Modal from '@mui/material/Modal';

const steps = ['Basic Report Details', 'Detailed Information'];

function Create_Report ({disasters, provinceIndex, citiesIndex, barangayIndex, reports}) {
    const [reportsID, setReportsID] = useState(0);
    const [reportsIDChecker, setReportsIDChecker] = useState(null);
    const [disasterID, setdisasterID] = useState('');
    const [selectedProvince, setselectedProvince] = useState('');
    const [provinceAssigned, setprovinceAssigned] = useState();
    const [disasterDetails, setdisasterDetails] = useState('');
    const [disaster, setDisaster] = useState('');
    const [dateofIncident, setdateofIncident] = useState(dayjs());
    const [timeofIncident, settimeofIncident] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');
    const [displacedFamiliesInsideEC, setdisplacedFamiliesInsideEC] = useState();
    const [displacedFamiliesOutsideEC, setdisplacedFamiliesOutsideEC] = useState('');
    const [totalServedNumberFamilies, settotalServedNumberFamilies] = useState('');
    const [totalServedNumberPersons, settotalServedNumberPersons] = useState('');
    const [damagedHousesTotally, setdamagedHousesTotally] = useState('');
    const [damagedHousesPartially, setdamagedHousesPartially] = useState('');
    const [costOfAssistanceDSWD, setcostOfAssistanceDSWD] = useState('');
    const [costOfAssistanceLGUAffected, setcostOfAssistanceLGUAffected] = useState('');
    const [costOfAssistanceLGUDonor, setcostOfAssistanceLGUDonor] = useState('');
    const [costOfAssistanceNGO, setcostOfAssistanceNGO] = useState('');
    const [reportedBy, setreportedBy] = useState('');
    const [checker, setChecker] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dateDisplay, setdateDisplay] = useState(dayjs().format('YYYY-MM-DD'));
    const [timeDisplay, settimeDisplay] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [createdData, setCreatedData] = useState([]);
    const [reportSummary, setreportSummary] = useState([]);
    const [open, setOpen] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessageModal, seterrorMessageModal] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        fetchReportsData();
    
        const reportsData = reports;
        setReportsIDChecker(reportsData);
    
        const largestReportsID = reportsData?.length
          ? Math.max(...reportsData.map((item) => Number(item.reportID)))
          : 0;
    
        setReportsID(largestReportsID + 1);
        setIsLoading(false);
    }, [provinceIndex, citiesIndex, barangayIndex, disasters, reports]);

    const fetchReportsData = () => {
        axios.get('http://127.0.0.1:8000/api/reports')
          .then(response => {
            const reportsData = response.data?.reports;
      
            if (reportsData && reportsData.length > 0) {
              const largestReportsID = Math.max(...reportsData.map(item => Number(item.reportID)));
              setReportsID(largestReportsID + 1);
            } else {
              setReportsID(1);
            }
            setReportsIDChecker(reportsData);
          })
          .catch(error => console.error('Error fetching reports:', error));
    };


    const storedDataString = localStorage.getItem('data');
    const storedData = JSON.parse(storedDataString);
    const provinceID = provinceIndex?.data?.filter(item => item.id === storedData.provinceAssigned) || [];
    const province_ID = storedData.provinceAssigned;
   
    const handleReset = () => {
        setdisasterDetails('');
        setDisaster('');
        setSelectedMunicipality('');
        setdisplacedFamiliesInsideEC('');
        setdisplacedFamiliesOutsideEC('');
        settotalServedNumberFamilies('');
        settotalServedNumberFamilies('');
        settotalServedNumberPersons('');
        setdamagedHousesTotally('');
        setdamagedHousesPartially('');
        setcostOfAssistanceDSWD('');
        setcostOfAssistanceLGUAffected('');
        setcostOfAssistanceLGUDonor('');
        setcostOfAssistanceNGO('');
        setreportedBy('');
        setdateofIncident(null);
        settimeofIncident(null);
        setChecker(false);
        setErrorMessage('')
        setdateDisplay('');
        settimeDisplay('');
        setActiveStep(0);
        setCreatedData([]);
        setreportSummary([]);
        setSelectedBarangay('');
    }

    const handleProvinceChange = (value) => {
        setprovinceAssigned(value.target.value);
    }

    const disasterdetailshandleChange = (value) => {
        setdisasterDetails(value.target.value);
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

    const handleReportedBy = (value) => {
        setreportedBy(value.target.value);
    }

    const handleMunicipalityChange = (event) => {
        setSelectedMunicipality(event.target.value);
        setSelectedBarangay('');
        setErrorMessage('')
    };

    const handleBarangayChange = (event) => {
        setSelectedBarangay(event.target.value);
        setdisplacedFamiliesInsideEC('');
        setdisplacedFamiliesOutsideEC('');
        settotalServedNumberFamilies('');
        settotalServedNumberFamilies('');
        settotalServedNumberPersons('');
        setdamagedHousesTotally('');
        setdamagedHousesPartially('');
        setcostOfAssistanceDSWD('');
        setcostOfAssistanceLGUAffected('');
        setcostOfAssistanceLGUDonor('');
        setcostOfAssistanceNGO('');
        setErrorMessage('')
    }

    const isAdmin = storedData.role === 'Admin';

    const filteredMunicipalityData = citiesIndex?.data?.filter(item => {
    return isAdmin ? item.provincesID === provinceAssigned : item.provincesID === province_ID;
    }) || [];


    //const filteredMunicipalityData = citiesIndex?.data?.filter(item => item.provincesID === province_ID) || [];
    console.log(provinceAssigned)
    console.log(storedData.provinceAssigned)
    const municipalitySelectedID = selectedMunicipality ? filteredMunicipalityData.find(item => item.name === selectedMunicipality) : null;
 
    const filteredBarangayData = barangayIndex?.data?.filter(item => item.citiesID === (municipalitySelectedID?.id || null)) || [];
    const barangaySelectedID = selectedBarangay ? filteredBarangayData.find(item => item.name === selectedBarangay) : null;

    const filteredDisasterData = disasters?.filter(item => item.disasterName) || [];
    console.log(disasters)
    const disasterhandleChange = (event) => 
    {
        setDisaster(event.target.value);
        const matchingDisaster = filteredDisasterData.find(
            d => d.disasterName === event.target.value
        );
        setdisasterID(matchingDisaster.id)
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        setdateofIncident(date);
        setdateDisplay(formattedDate);
    };
    const handleTimeChange = (time) => {
        const formattedTime = time ? dayjs(time).format('HH:mm') : null;
        settimeofIncident(time);
        settimeDisplay(formattedTime);
    };

    const customHeightStyle1 = {
        height: '5%'
    }

    const customHeightStyle2 = {
        height: '95%'
    }

    const customHeightStyle3 = {
        height: '90%'
    }

    const customHeightStyle4 = {
        height: '10%'
    }


    const handleAnotherData = () => {
        setChecker(true);
        const flattenedArray = createdData.flatMap(innerArray => innerArray);
        const foundItem = barangaySelectedID ? flattenedArray.find(item => item.barangay === barangaySelectedID.id) : null;
    
        if (foundItem) {
            setErrorMessage(`There is already an entry for Barangay: ${selectedBarangay}`);
        } else if (!selectedMunicipality) {
            setErrorMessage('Please fill in the Municipality field.');
        } else if (!selectedBarangay) {
            setErrorMessage('Please fill in the Barangay field.');
        } else if (
            displacedFamiliesInsideEC || displacedFamiliesOutsideEC ||
            totalServedNumberFamilies || totalServedNumberPersons ||
            damagedHousesTotally || damagedHousesPartially ||
            costOfAssistanceDSWD || costOfAssistanceLGUAffected ||
            costOfAssistanceLGUDonor || costOfAssistanceNGO
        ) {
            const newData = {
                employeeID: storedData.id,
                reportID: reportsID,
                province: isAdmin ? provinceAssigned : storedData.provinceAssigned,
                disasterDetails: disasterDetails,
                disaster: disasterID,
                cities: municipalitySelectedID.id,
                barangay: barangaySelectedID.id,
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
                reportType: 1,
                reportedBy: reportedBy,
                dateofIncident: dateDisplay,
                timeofIncident: timeDisplay,
            };
            setCreatedData([...createdData, newData]);
            const displayData = {
                province: isAdmin ? provinceAssigned : storedData.provinceAssigned,
                disasterDetails: disasterDetails,
                disaster: disaster,
                cities: selectedMunicipality,
                barangay: selectedBarangay,
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
                reportedBy: reportedBy,
                dateofIncident: dateDisplay,
                timeofIncident: timeDisplay,
            };
            setErrorMessage('');
            setreportSummary([...reportSummary, displayData]);
           
        } else {
            setErrorMessage('Please fill at least one data field');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    }
   
    const handleClickClose = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        handleReset();
        setErrorModal(false);
        setOpen(false);
    }

    const handleClickConfirm = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        handleReset();
        window.location.reload();
    }

    const handleNext = () => {
        if(!disaster || !disasterDetails || !reportedBy || !dateofIncident || !timeofIncident){
            setErrorMessage('Please fill out all the required fields.')
        }
        else{
            if (provinceID.length > 0) {
                setprovinceAssigned(provinceID[0].name)
            } else {
                console.error('No matching province found');
            }
            setChecker(true);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
  
    const handleBack = () => {
        setErrorMessage('')
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSubmit = async () => {
        if(createdData.length === 0){
            setErrorMessage('Nothing to submit, report form is empty.')
        }
        else{
            try {
                const allReports = Object.values(createdData).flat();
                const responses = await Promise.all(
                allReports.map(async (data) => {
                    try {
                        const response = await axios.post('http://127.0.0.1:8000/api/newrepcreate', {
                            reportID: data.reportID,
                            disasterID: data.disaster,
                            disasterInfo: data.disasterDetails,
                            provincesID: data.province,
                            citiesID: data.cities,
                            barangaysID: data.barangay,
                            dateOfIncident: dateDisplay,
                            timeOfIncident: timeDisplay,
                            reportType: data.reportType,
                            employeeID: data.employeeID,
                            reportedBy: reportedBy,
                            displacedFamiliesInsideEC: data.displacedFamiliesInsideEC,
                            displacedFamiliesOutsideEC: data.displacedFamiliesOutsideEC,
                            totalServedNumberFamilies: data.totalServedNumberFamilies,
                            totalServedNumberPersons: data.totalServedNumberPersons,
                            damagedHousesTotally: data.damagedHousesTotally,
                            damagedHousesPartially: data.damagedHousesPartially,
                            costOfAssistanceDSWD: data.costOfAssistanceDSWD,
                            costOfAssistanceLGUAffected: data.costOfAssistanceLGUAffected,
                            costOfAssistanceLGUDonor: data.costOfAssistanceLGUDonor,
                            costOfAssistanceNGO: data.costOfAssistanceNGO,
                        });
                        fetchReportsData();
                        handleClickOpen();
                        setErrorMessage('');
                        return response.data;
                    } catch (error) {
                        if (error.response) {
                            // The request was made, and the server responded with a status code
                            console.error('Response Error:', error.response.status);
                            console.error('Response Data:', error.response.data);
                            console.error('Response Headers:', error.response.headers);
                    
                            if (error.response.status === 401) {
                                seterrorMessageModal('Unauthorized User.');
                                setErrorModal(true);
                            } else {
                                console.log('Request Error:', error.message);
                            }
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.error('No Response from Server');
                            console.error('Request Config:', error.config);
                        } else {
                            // Something happened in setting up the request that triggered an error
                            console.error('Request Error:', error.message);
                        }
                    }
                })
            );

            } catch (error) {
                if (error.response) {
                    // Server responded with an error status code
                    console.error('Server Error:', error.response.data);
                    // Log the validation errors
                    console.log('Validation Errors:', error.response.data.errors);
                    // Handle specific error cases if needed
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No Response from Server');
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Request Error:', error.message);
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


    return (
        <>
        <div className="w-full block md:flex h-full">
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
                //onClose={handleClickClose}
               
            >
                <Box style={style}>
                    <div className="p-5  bg-white  shadow-md flex-col justify-center">
                        <p className="flex justify-center text-green-500 text-3xl font-bold">Success!</p>
                        <p className="flex justify-center mt-2">Your report has been submitted.</p>
                    </div>
                    <Button sx={{   width:'100%', 
                                    backgroundColor: '#22c55e', 
                                    color: 'white',
                                    '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                onClick={handleClickConfirm}
                                >
                            Continue
                    </Button>
                </Box>
            </Modal>
            <div className="md:w-1/2 md:mr-2 h-full bg-white shadow-md">
                <div style={customHeightStyle1} className="bg-sky-600 flex items-center text-white pl-2">
                    <p>Create Report</p>
                </div>
                <div style={customHeightStyle2} className="">
                    <div style={customHeightStyle3} className="w-full flex flex-col justify-center items-center">
                        <div className="h-full mt-2 w-full pr-2 pl-2 overflow-y-auto pb-3">   
                        <Box sx={{ width: '100%', marginTop: '10px' }}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                            <React.Fragment>
                            {activeStep === 0 && (
                                <>
                                    {errorMessage !== '' ? (
                                    <p className="border-2 border-red-300 flex justify-center mt-3 text-red-500 bg-red-200 rounded-lg py-2 mx-2.5">{errorMessage}</p>
                                    ) : ''}
                                    <TextField
                                        value={disasterDetails}
                                        sx={{ m: 1, width: '98%', marginTop: 3 }}
                                        label="Disaster Details"
                                        multiline
                                        maxRows={2}
                                        onChange={disasterdetailshandleChange}   
                                        disabled={checker}              
                                    />
                                    <FormControl sx={{ m: 1, width: '98%' }}>
                                    
                                    <InputLabel>Disaster</InputLabel>                                      
                                        <Select
                                            disabled={checker}
                                            label="Disaster"
                                            value={disaster}
                                            onChange={disasterhandleChange}
                                            
                                        >
                                            {filteredDisasterData.map((item) => (
                                                <MenuItem
                                                    disabled={checker}
                                                    key={item.disasterName}
                                                    value={item.disasterName}
                                                >
                                                    {item.disasterName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    
                                    <TextField
                                        disabled={checker}
                                        value={reportedBy}
                                        sx={{ m: 1, width: '98%', marginTop:1 }}
                                        label="Reported By"
                                        multiline
                                        onChange={handleReportedBy}                 
                                    />
                                    <p className="mt-2 pl-3 text-l text-gray-600">Date of Incident</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        disabled={checker}
                                        sx={{ m: 1, width: '98%', marginTop:0 }}
                                        value={dateofIncident}
                                        onChange={handleDateChange}
                                        format="MM-DD-YYYY"
                                        className="w-full"
                                    />
                                    </LocalizationProvider>
                                    <p className="mt-2 pl-3 text-l text-gray-600">Time of Incident</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker 
                                        disabled={checker}
                                        sx={{ m: 1, width: '98%', marginTop:0 }}
                                        onChange={handleTimeChange}
                                        value={timeofIncident}
                                    />
                                    </LocalizationProvider>
                                </>
                            )}

                            {activeStep === 1 && (
                            <>
                                {errorMessage !== '' ? (
                                    <p className="border-2 border-red-300 flex justify-center mt-3 text-red-500 bg-red-200 rounded-lg py-2 mx-2.5">{errorMessage}</p>
                                    ) : ''}

                                <FormControl sx={{ m: 1, width: '98%', marginTop: 3 }}>
                                    {storedData.role === 'User' ? (
                                        <InputLabel id="demo-simple-select-disabled-label">
                                            <LockIcon sx={{ color: 'gray', marginLeft: '-2px', marginRight: '5px', marginBottom: '5px', width: '20px' }} />
                                            {provinceAssigned}
                                        </InputLabel>
                                        ) : (
                                        <InputLabel>Province</InputLabel>
                                    )}
                                    <Select
                                        value={storedData.role === 'Admin' ? provinceAssigned : ''}
                                        onChange={handleProvinceChange}
                                        label={storedData.role === 'Admin' ? 'Province' : provinceAssigned}
                                        disabled={storedData.role === 'User'}
                                    >
                                        {provinceIndex.data.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                    <InputLabel>Municipality</InputLabel>
                                    <Select
                                        value={selectedMunicipality}
                                        onChange={handleMunicipalityChange}
                                        input={<OutlinedInput label="Municipality" />}
                                    >
                                        {filteredMunicipalityData.map((item, index) => (
                                        <MenuItem key={index} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>      
                                <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                    <InputLabel>Barangay</InputLabel>
                                    <Select
                                        value={selectedBarangay}
                                        onChange={handleBarangayChange}
                                        input={<OutlinedInput label="Municipality" />}
                                    >
                                        {filteredBarangayData.map((item, index) => (
                                        <MenuItem key={index} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>                  
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
                                    label="Total Affected Number Families"
                                    type="number"
                                    onChange={handleTotalServedNumberFamilies}
                                />  
                                <TextField
                                    value={totalServedNumberPersons}
                                    sx={{ m: 1, width: '98%', marginTop:1 }}
                                    label="Total Affected Number Persons"
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
                            </>
                            )}
                            </React.Fragment>
                         </Box>                                      
                        </div>
                    </div>
                    <div style={customHeightStyle4} className="border-t-2 border-gray-200 flex justify-center items-center mx-10 overflow-hidden">
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Button
                            
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 3 ,px: 2, 
                                color:'white',
                                backgroundColor: activeStep === 0 ? '#fee2e2' : '#f87171', 
                                '&:hover': {
                                    backgroundColor: '#ef4444',
                                    boxShadow: 'none', 
                                }, }}                          
                            >
                            Back
                        </Button>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleAnotherData}
                            sx={{ mr: 3 , px: 2,
                                color:'white',
                                backgroundColor: activeStep === 0 ? '#bae6fd' : '#0284c7',
                                '&:hover': {
                                    backgroundColor: '#06b6d4',
                                    boxShadow: 'none', 
                                }, }}                          
                            >
                            Add to Report Form
                        </Button>
                        <Button
                            color="inherit"
                            onClick={handleReset}
                            sx={{ mr: 3 , px: 2,
                                color:'white',
                                backgroundColor: '#ef4444',
                                '&:hover': {
                                    backgroundColor: '#dc2626',
                                    boxShadow: 'none', 
                                }, }}                          
                            >
                            Reset All Data
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                sx={{ color:'white', px: 2,
                                backgroundColor:'#22c55e', 
                                '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none', 
                                }, }} 
                                >
                            {activeStep === steps.length - 1 ? 'Submit Data' : 'Next'}
                        </Button>
                    </Box>
                    </div>
                </div>
            </div>
            
            <div className="md:w-1/2 md:ml-2 overflow-y-auto bg-white md:mt-0 mt-4 shadow-md">
                <div style={customHeightStyle1} className="bg-sky-600 flex items-center text-white pl-2">
                    <p>Report Summary</p>
                </div>
                <div style={customHeightStyle2} className="flex-col">
                    <div className="h-2/6  w-full px-3 flex justify-center items-center">
                        <div className="h-full w-full pr-2 pl-2 overflow-y-auto mt-4">   
                            <div className="">
                                <p className="mt-2 ml-1 text-lg">Disaster Details</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={disasterDetails}
                                sx={{ width: '98%', marginTop: 0, marginLeft: 1, height:'10px'}}
                                   
                                />
                                <p className="mt-5 ml-1 text-lg">Disaster Type</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={disaster}
                                sx={{ width: '98%', marginTop: 0, marginLeft: 1, height:'10px'}}   
                                />
                                <p className="mt-5 ml-1 text-lg">Reported By</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={reportedBy}
                                sx={{ width: '98%', marginTop: 0, marginLeft: 1, height:'10px'}}    
                                />
                            </div>
                        </div>
                        <div className="h-full w-full pr-2 pl-2 overflow-y-auto mt-4">   
                            <div className="">
                                <p className="mt-2 ml-1 text-lg">Date of Incident</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={dateDisplay}
                                sx={{ width: '98%', marginTop: 0, marginLeft: 1, height:'10px'}}          
                                />
                                <p className="mt-5 ml-1 text-lg">Time of Incident</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={timeDisplay}
                                sx={{ width: '98%', marginTop: 0, marginLeft: 1, height:'10px'}}     
                                />
                            </div>
                        </div>
                    </div>     
                    <div className="h-4/6 w-full px-5 overflow-y-auto">
                        <DisplayData createdData={reportSummary} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Create_Report;
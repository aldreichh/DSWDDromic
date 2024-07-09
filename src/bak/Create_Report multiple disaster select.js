import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
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
import { Sick } from '@mui/icons-material';


const steps = ['Basic Report Details', 'Detailed Information'];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  

function Create_Report () {
    const theme = useTheme();
    const [allReports, setAllReports] = useState([]);
    const [reportsID, setReportsID] = useState(0);
    const [reportsIDChecker, setReportsIDChecker] = useState(null);
    const [provinceAssigned, setprovinceAssigned] = useState();
    const [provinceIndex, setprovinceIndex] = useState([]);
    const [disasterDetails, setdisasterDetails] = useState('');
    const [disasterIndex, setDisasterIndex] = useState({});
    const [citiesIndex, setcitiesIndex] = useState({});
    const [barangayIndex, setbarangayIndex] = useState([]);
    const [disaster, setDisaster] = useState([]);
    const [dateofIncident, setdateofIncident] = useState(null);
    const [timeofIncident, settimeofIncident] = useState(null);
    const [userProvince] = useState(1);
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
    const [dateDisplay, setdateDisplay] = useState('');
    const [timeDisplay, settimeDisplay] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [createdData, setCreatedData] = useState([]);
    const [reportSummary, setreportSummary] = useState([]);
    const [open, setOpen] = useState(false);

    const storedDataString = localStorage.getItem('data');
    const storedData = JSON.parse(storedDataString);
    const provinceID = provinceIndex?.data?.filter(item => item.id === storedData.provinceAssigned) || [];

    const handleReset = () => {
        setdisasterDetails('');
        setDisaster([]);
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

    
    useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/dashboardindex')
        .then(response => setAllReports(response.data))
        .catch(error => console.error('Error fetching reports:', error));
    axios.get('http://127.0.0.1:8000/api/provincesindex')
        .then(response => setprovinceIndex(response.data))
        .catch(error => console.error('Error fetching reports:', error));
    axios.get('http://127.0.0.1:8000/api/citiesindex')
        .then(response => setcitiesIndex(response.data))
        .catch(error => console.error('Error fetching reports:', error));
    axios.get('http://127.0.0.1:8000/api/barangaysindex')
        .then(response => setbarangayIndex(response.data))
        .catch(error => console.error('Error fetching reports:', error));
    axios.get('http://127.0.0.1:8000/api/getindexdisaster')
        .then(response => setDisasterIndex(response.data))
        .catch(error => console.error('Error fetching reports:', error));
    axios.get('http://127.0.0.1:8000/api/reports')
    .then(response => {
        setReportsIDChecker(response.data);
        const largestReportsID = response.data?.reports?.length
          ? Math.max(...response.data.reports.map(item => Number(item.reportID)))
          : 0;
        setReportsID(largestReportsID);
      })
      .catch(error => console.error('Error fetching reports:', error));
    }, []);


    const filteredMunicipalityData = citiesIndex?.data?.filter(item => item.provincesID === 1) || [];
    const municipalitySelectedID = selectedMunicipality ? filteredMunicipalityData.find(item => item.name === selectedMunicipality) : null;

    const filteredBarangayData = barangayIndex?.data?.filter(item => item.citiesID === (municipalitySelectedID?.id || null)) || [];
    const barangaySelectedID = selectedBarangay ? filteredBarangayData.find(item => item.name === selectedBarangay) : null;

    const filteredDisasterData = disasterIndex?.data?.filter(item => item.disasterName) || [];
    const selectedDisasterID = disaster
    ? disaster.map((selectedDisasterName) => {
        const selectedDisaster = filteredDisasterData.find(
            (item) => item.disasterName === selectedDisasterName
        );
        return selectedDisaster ? selectedDisaster.id : null;
        })
    : [];
    

    const disasterhandleChange = (event) => {
        const {
        target: { value },
        } = event;
        setDisaster(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? dayjs(date).format('MM-DD-YYYY') : null;
        setdateofIncident(date);
        setdateDisplay(formattedDate);
    };

    const handleTimeChange = (time) => {
        const formattedTime = time ? dayjs(time).format('hh:mm A') : null;
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

    const customHeightStyle5 = {
        height: '100%'
    }

    const handleAnotherData = () => {
        setReportsID(reportsID+1);
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
                province: storedData.provinceAssigned,
                disasterDetails: disasterDetails,
                disaster: 1,
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
                status: 1,
            };
            setCreatedData([...createdData, newData]);
            const displayData = {
                province: userProvince,
                disasterDetails: disasterDetails,
                disaster: selectedDisasterID,
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
        setOpen(false);
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
                        const response = await axios.post('http://127.0.0.1:8000/api/createreport', {
                            reportID: data.reportID,
                            disasterID: data.disaster,
                            disasterInfo: data.disasterDetails,
                            provincesID: data.province,
                            citiesID: data.cities,
                            barangaysID: data.barangay,
                            dateOfIncident: data.dateofIncident,
                            timeOfIncident: data.timeofIncident,
                            reportType: data.reportType,
                            employeeID: data.employeeID,
                            status: data.status,
                            displacedFamiliesInsideEC: data.displacedFamiliesInsideEC,
                            displacedFamiliesOutsideEC: data.displacedFamiliesOutsideEC,
                            totalServedNumberFamilies: data.totalServedNumberFamilies,
                            totalServedNumberPersons: data.totalServedNumberPersons,
                            damagedHousesTotally: data.damagedHousesTotally,
                            damagedHousesPartially: data.damagedHousesPartially,
                            costOfAssistanceDSWD: data.costOfAssistanceDSWD,
                            costOfAssistanceLGUAffected: data.costOfAssistanceLGUAffected,
                            costOfAssistanceNGO: data.costOfAssistanceNGO,
                        });
                        handleClickOpen();
                        setErrorMessage('');
                        return response.data;

                        
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
                                onClick={handleClickClose}
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
                                    <p className="mt-2 pl-3 text-sm">*Can select multiple disasters</p>
                                    <FormControl sx={{ m: 1, width: '98%' }}>
                                    <InputLabel>Disaster</InputLabel>                                      
                                        <Select
                                            disabled={checker}
                                            multiple
                                            value={disaster}
                                            onChange={disasterhandleChange}
                                            input={<OutlinedInput label="Disaster" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {filteredDisasterData.map((item) => (
                                                <MenuItem
                                                    disabled={checker}
                                                    key={item.disasterName}
                                                    value={item.disasterName}
                                                    style={getStyles(item.disasterName, disaster, theme)}
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
                                <FormControl sx={{ m: 1, marginTop: 1, width: '98%', marginTop: 3 }}>
                                    <InputLabel id="demo-simple-select-disabled-label">
                                        <LockIcon sx={{ color: 'gray', marginLeft: '-2px', marginRight:'5px', marginBottom:'5px', width:'20px' }} />
                                        {provinceAssigned}
                                    </InputLabel>
                                    <Select
                                        label={provinceAssigned}
                                        disabled
                                    >
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
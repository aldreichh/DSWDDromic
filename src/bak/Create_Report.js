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
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';




import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];


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

const disasters = [
    'Agricultural Disease',
    'Armed Conflict',
    'Deforestation',
    'Drought',
    'Dry Spell',
    'Earthquake',
    'Fire Incident',
    'Flash Flood',
    'Flood',
    'Heavy Rains',
    'Industrial Accident',
    'Landslide',
    'Mudslide',
    'Outbreak',
    'Pandemic',
    'Terrorism',
    'Volcanic Eruption',
    'War',
    'Wildfire',
    'Weather Disturbance - Trough of LPA',
    'Weather Disturbance - LPA',
    'Weather Disturbance - Southwest Monsoon',
    'Weather Disturbance - Northeast Monsoon',
    'Weather Disturbance - Easterlies',
    'Weather Disturbance - Tropical Storm'
];

const provinces = [
    'Davao De Oro',
    'Davao Del Sur',
    'Davao Occidental',
    'Davao Oriental',
    'Davao Del Norte',
];

const municipalities = [
    {
        label: 'Davao De Oro',
        cities: [
            { name: 'COMPOSTELA', id: 41 },
            { name: 'LAAK', id: 42 },
            { name: 'MABINI', id: 43 },
            { name: 'MACO', id: 44 },
            { name: 'MARASUGAN', id: 45 },
            { name: 'MAWAB', id: 46 },
            { name: 'MONKAYO', id: 47 },
            { name: 'MONTEVISTA', id: 48 },
            { name: 'NABUNTURAN', id: 49 },
            { name: 'NEW BATAAN', id: 50 },
            { name: 'PANTUKAN', id: 51 },
        ],
    },
    {
        label: 'Davao Del Sur',
        cities: [
            { name: 'BANSALAN', id: 1 },
            { name: 'DIGOS CITY', id: 2 },
            { name: 'HAGONOY', id: 3 },
            { name: 'KIBLAWAN', id: 4 },
            { name: 'MAGSAYSAY', id: 5 },
            { name: 'MALALAG', id: 6 },
            { name: 'MATANAO', id: 7 },
            { name: 'PADADA', id: 8 },
            { name: 'STA.CRUZ', id: 9 },
            { name: 'SULOP', id: 10 },
            { name: 'DAVAO CITY', id: 63 },
        ],
    },
    {
        label: 'Davao Occidental',
        cities: [
            { name: 'DON MARCELINO', id: 11 },
            { name: 'JOSE ABAD SANTOS', id: 12 },
            { name: 'MALITA', id: 13 },
            { name: 'STA. MARIA', id: 14 },
            { name: 'SARANGANI', id: 15 },
        ],
    },
    {
        label: 'Davao Oriental',
        cities: [
            { name: 'BAGANGA', id: 52 },
            { name: 'BANAYBANAY', id: 53 },
            { name: 'BOSTON', id: 54 },
            { name: 'CARAGA', id: 55 },
            { name: 'CATEEL', id: 56 },
            { name: 'GOVERNOR GENEROSO', id: 57 },
            { name: 'LUPON', id: 58 },
            { name: 'MANAY', id: 59 },
            { name: 'MATI CITY', id: 60 },
            { name: 'SAN ISIDRO', id: 61 },
            { name: 'TARRAGONA', id: 62 },
        ],
    },
    {
        label: 'Davao Del Norte',
        cities: [
            { name: 'ASUNCION', id: 30 },
            { name: 'BRAULIO E. DUJALI', id: 31 },
            { name: 'CARMEN', id: 32 },
            { name: 'KAPALONG', id: 33 },
            { name: 'NEW CORELLA', id: 34 },
            { name: 'PANABO', id: 35 },
            { name: 'IGACOS', id: 36 },
            { name: 'SAN ISIDRO', id: 37 },
            { name: 'STO.TOMAS', id: 38 },
            { name: 'SULOP', id: 39 },
            { name: 'TALAINGOD', id: 40 },
        ],
    },
];

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
    const [disasterDetails, setdisasterDetails] = useState('');
    const [disaster, setDisaster] = useState([]);
    const [typeofReport, settypeofReport] = useState('Initial Report');
    const [status, setStatus] = useState('Pending');
    const [dateofIncident, setdateofIncident] = useState(null);
    const [timeofIncident, settimeofIncident] = useState(null);
    const [userProvince] = useState('Davao Del Sur');
    const [barangayIndex, setbarangayIndex] = useState([]);
    const [barangay, setBarangay] = useState({});
    const [municipalityId, setMunicipalityId] = useState(null);
    const [municipality, setMunicipality] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');
    const [selectedBarangay2, setSelectedBarangay2] = useState('');
    const [displacedFamiliesInsideEC, setdisplacedFamiliesInsideEC] = useState('');
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
    const [error, setError] = useState(false);
    const [dateDisplay, setdateDisplay] = useState('');
    const [timeDisplay, settimeDisplay] = useState('');


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
        const selectedMunicipalityName = event.target.value;
      
        // Find the selected municipality in the array
        const selectedMunicipality = municipalities
          .flatMap((region) => region.cities)
          .find((city) => city.name === selectedMunicipalityName);
      
        // If a municipality is found, update the state with its ID
        if (selectedMunicipality) {
          setMunicipality(selectedMunicipalityName);
          setMunicipalityId(selectedMunicipality.id);
        } else {
          // If no municipality is found, you may want to reset the ID to null or some default value
          setMunicipality('');
          setMunicipalityId(null);
        }
    };

    const handleBarangayChange = (event) => {
        setSelectedBarangay2(event.target.value);
        setSelectedBarangay(barangay[municipalityId][event.target.value]);
    }

    console.log(selectedBarangay);

    useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/barangaysindex')
        .then(response => setbarangayIndex(response.data))
        .catch(error => console.error('Error fetching reports:', error));
    }, []);

    

    useEffect(() => {
    if (barangayIndex.data) {
        const categorizedBarangays = barangayIndex.data.reduce((accumulator, barangay) => {
        const { citiesID, name } = barangay;

        // Use the citiesID as the key for the state object
        setBarangay(prevState => ({
            ...prevState,
            [citiesID]: [...(prevState[citiesID] || []), name],
        }));

        return accumulator;
        }, []);
    }
    }, [barangayIndex]);

    console.log('this is the data'+barangayIndex.data)

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
        setdateofIncident(formattedDate);
        setdateDisplay(formattedDate);
    };

    const handleTimeChange = (time) => {
        const formattedTime = time ? dayjs(time).format('hh:mm A') : null;
        settimeofIncident(formattedTime);
        settimeDisplay(formattedTime);
    };

    console.log(disaster)
    
    const handleReset = () => {
        setdisasterDetails('');
        setDisaster([]);
        setMunicipality([]);
        setdisplacedFamiliesInsideEC('');
        setdisplacedFamiliesOutsideEC('');
        setdateofIncident(null);
        settimeofIncident(null);
        setSelectedBarangay2(null);
        setChecker(false);
        setError(false);
        setreportedBy('');
        setdateDisplay('');
        settimeDisplay('');
    }

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


    const  [createdData, setCreatedData] = useState([
        { 
            province: '', 
            disasterDetails: '',
            disaster: [],
            cities: '', 
            barangays: '', 
            displacedFamiliesInsideEC: '', 
            displacedFamiliesOutsideEC: '', 
            totalServedNumberFamilies: '',
            totalServedNumberPersons: '',
            damagedHousesTotally: '',
            damagedHousesPartially: '',
            costOfAssistanceDSWD: '',
            costOfAssistanceLGUAffected: '',
            costOfAssistanceLGUDonor: '',
            costOfAssistanceNGO: '',
            reportType: 'Initial Report',
            reportedBy: '',
            dateofIncident: '',
            timeofIncident: '',
            status: 'Pending',
        },
    ]);

    const [data, setData] = useState(createdData);

    const handleAnotherData = () => {
        if(!disaster || !disasterDetails || !reportedBy || !dateofIncident || !timeofIncident){
            console.log('please enter all details')
            setError(true);
        }
        else{
            setChecker(true);
            const newData = {
            province: userProvince,
            disasterDetails: disasterDetails,
            disaster: disaster,
            cities: municipality,
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
            reportType: 'Initial Report',
            reportedBy: reportedBy,
            dateofIncident: dateofIncident,
            timeofIncident: timeofIncident,
            status: 'Pending',
        };
        setCreatedData([...createdData, newData]);
        setData([...data, newData]);
        }
        
    };

    console.log(data);

    return (
        <>
        <div className="w-full block md:flex h-full">
            <div className="md:w-1/2 md:mr-2 h-full bg-white">
                <div style={customHeightStyle1} className="bg-sky-600 flex items-center text-white pl-2">
                    <p>Create Report</p>
                </div>
                <div style={customHeightStyle2} className="">
                    <div style={customHeightStyle3} className="w-full flex flex-col justify-center items-center">
                        <div className="h-full mt-2 w-full pr-2 pl-2 overflow-y-auto pb-3">   
                            <TextField
                                value={disasterDetails}
                                sx={{ m: 1, width: '98%', marginTop:1 }}
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
                                {disasters.map((disaster) => (
                                    <MenuItem
                                    error={error && !disaster}
                                    disabled={checker}
                                    key={disaster}
                                    value={disaster}
                                    style={getStyles(disaster, disaster, theme)}
                                    >
                                    {disaster}
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
                            <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                <InputLabel id="demo-simple-select-disabled-label">
                                    <LockIcon sx={{ color: 'gray', marginLeft: '-2px', marginRight:'5px', marginBottom:'5px', width:'20px' }} />
                                    {userProvince}
                                </InputLabel>
                                <Select
                                    label={userProvince}
                                    disabled
                                >
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                <InputLabel>Municipality</InputLabel>
                                <Select
                                    value={municipality}
                                    onChange={handleMunicipalityChange}
                                    input={<OutlinedInput label="Municipality" />}
                                    >
                                    {municipalities.find((region) => region.label === userProvince)?.cities.map((city) => (
                                        <MenuItem
                                        key={city.id}
                                        value={city.name}
                                        style={getStyles(city.name, municipality, theme)}
                                        >
                                        {city.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>      
                            <FormControl sx={{ m: 1, marginTop: 1, width: '98%' }}>
                                <InputLabel>Barangay</InputLabel>           
                                <Select
                                label="Barangay"
                                value={selectedBarangay2}
                                onChange={handleBarangayChange}
                            >
                                {barangay[municipalityId] &&
                                Object.entries(barangay[municipalityId]).map(([key, value]) => (
                                    <MenuItem key={key} value={key}>
                                    {value}
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
                        </div>
                    </div>
                    <div style={customHeightStyle4} className="border-t-2 border-gray-200 flex justify-center items-center mx-10">
                        <Button sx={{
                            backgroundColor:'#f87171', 
                            marginRight: 4, 
                            '&:hover': {
                                backgroundColor: '#ef4444',
                                boxShadow: 'none', 
                            }, }} 
                            variant="contained"
                            onClick={handleReset}
                            >
                            Clear All
                        </Button>
                        <Button sx={{
                            backgroundColor:'#22c55e', 
                            '&:hover': {
                                backgroundColor: '#16a34a',
                                boxShadow: 'none', 
                            }, }} 
                            onClick={handleAnotherData}
                            variant="contained">
                            Add Another Data
                        </Button>
                        <Button sx={{
                            backgroundColor:'#22c55e', 
                            marginLeft: 4,
                            '&:hover': {
                                backgroundColor: '#16a34a',
                                boxShadow: 'none', 
                            }, }} 
                            variant="contained">
                            Submit Report
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="md:w-1/2 md:ml-2 overflow-y-auto bg-white md:mt-0 mt-4">
                <div style={customHeightStyle1} className="bg-sky-600 flex items-center text-white pl-2">
                    <p>Report Summary</p>
                </div>
                <div style={customHeightStyle2} className="flex-col">
                    <div className="h-2/6  w-full flex justify-center items-center">
                        <div className="h-full w-full pr-2 pl-2 overflow-y-auto">   
                            <div className="">
                                <p className="mt-2 ml-1 text-gray-500 text-lg">Disaster Details</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={disasterDetails}
                                sx={{ m: 1, width: '98%', marginTop:1, height:'10px'}}
                                   
                                />
                                <p className="mt-8 ml-1 text-gray-500 text-lg">Disaster Type</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={disaster}
                                sx={{ m: 1, width: '98%', marginTop:1, height:'10px'}}        
                                />
                                <p className="mt-8 ml-1 text-gray-500 text-lg">Reported By</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={reportedBy}
                                sx={{ m: 1, width: '98%', marginTop:1, height:'10px'}}         
                                />
                            </div>
                        </div>
                        <div className="h-full w-full pr-2 pl-2 overflow-y-auto">   
                            <div className="">
                                <p className="mt-2 ml-1 text-gray-500 text-lg">Date of Incident</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={dateDisplay}
                                sx={{ m: 1, width: '98%', marginTop:1, height:'10px'}}           
                                />
                                <p className="mt-8 ml-1 text-gray-500 text-lg">Time of Incident</p>
                                <TextField
                                variant="standard"
                                disabled
                                value={timeDisplay}
                                sx={{ m: 1, width: '98%', marginTop:1, height:'10px'}}          
                                />
                            </div>
                        </div>
                    </div>     
                    <div className="h-4/6 w-full pr-2 pl-2 overflow-y-auto">
                        <p className="mt-2 ml-1 text-gray-500 text-lg">Municipality: </p>
                        <p className="mt-2 ml-1 text-gray-500 text-lg">Barangay: </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Create_Report;
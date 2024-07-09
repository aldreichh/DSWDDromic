import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import axios from 'axios';


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
 
export default function Filter_By({ onFilterChange, disasters, provinceIndex, citiesIndex, barangayIndex }) {
    const theme = useTheme();
    const [disasterFilter, setDisasterFilter] = useState([]);
    const [provinceFilter, setProvinceFilter] = useState([]);
    const [municipalityFilter, setMunicipalityFilter] = useState([]);
    const [barangayFilter, setBarangayFilter] = useState([]);
    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [typeofReport, settypeofReport] = useState('');
    const [error, setError] = useState('');
    const [disasterIDChecker, setdisasterIDChecker] = useState({});
    const [provinceIDChecker, setprovinceIDChecker] = useState({});
    const [municipalityIDChecker, setmunicipalityIDChecker] = useState({});
    const [barangayIDChecker, setbarangayIDChecker] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const filteredDisasterData = disasters?.filter(item => item.disasterName) || [];
    const filteredProvinceData = provinceIndex?.data?.filter(item => item.name)|| [];
    const filteredMunicipalitiesData = citiesIndex?.data?.filter(municipality =>
        Array.isArray(provinceIDChecker) && provinceIDChecker.includes(municipality.provincesID)
    ) || [];
    
    const filteredBarangayData = barangayIndex?.data?.filter(barangay =>
        Array.isArray(municipalityIDChecker) && municipalityIDChecker.includes(barangay.citiesID)
    ) || [];

    const disasterFilterChange = (event) => {
        const {
            target: { value },
        } = event;
    
        const selectedDisasters = typeof value === 'string' ? value.split(',') : value;

        const disasterIDChecker = selectedDisasters.map(selectedDisasters => {
            const matchingDiaster = filteredDisasterData.find(disaster => disaster.disasterName === selectedDisasters);
            return matchingDiaster ? matchingDiaster.id : null;
        });

        setDisasterFilter(selectedDisasters);
        setdisasterIDChecker(disasterIDChecker);
        onFilterChange({ disasterFilter: value, provinceFilter, municipalityFilter, barangayFilter, selectedDate1, selectedDate2, typeofReport });
    };
   
    const provinceFilterChange = (event) => {
        const {
            target: { value },
        } = event;
    
        const selectedProvinces = typeof value === 'string' ? value.split(',') : value;
    
        // Assuming filteredProvinceData has properties like 'id' and 'name'
        const provinceIDChecker = selectedProvinces.map(selectedProvince => {
            const matchingProvince = filteredProvinceData.find(province => province.name === selectedProvince);
            return matchingProvince ? matchingProvince.id : null;
        });
        setMunicipalityFilter([])
        setBarangayFilter([])
        setProvinceFilter(selectedProvinces);
        setprovinceIDChecker(provinceIDChecker); 
        //onFilterChange({ disasterFilter, provinceIDChecker: provinceIDChecker, municipalityFilter , barangayFilter,  selectedDate1, selectedDate2, typeofReport });
        onFilterChange({ disasterFilter, provinceFilter: value, municipalityFilter , barangayFilter,  selectedDate1, selectedDate2, typeofReport });
    };
    
    const municipalityFilterChange = (event) => {
        const {
          target: { value },
        } = event;
        const selectedMunicipalities = typeof value === 'string' ? value.split(',') : value;

        const municipalityIDChecker = selectedMunicipalities.map(selectedMunicipalities => {
            const matchingMunicipality = filteredMunicipalitiesData.find(municipality => municipality.name === selectedMunicipalities);
            return matchingMunicipality ? matchingMunicipality.id : null;
        });

        setMunicipalityFilter(selectedMunicipalities);
        setmunicipalityIDChecker(municipalityIDChecker);
        //onFilterChange({ disasterFilter, provinceFilter, municipalityIDChecker: municipalityIDChecker, barangayFilter,  selectedDate1, selectedDate2, typeofReport });
        onFilterChange({ disasterFilter, provinceFilter, municipalityFilter: value, barangayFilter,  selectedDate1, selectedDate2, typeofReport });
    };

    const barangayFilterChange = (event) => {
        const {
            target: { value },
        } = event;
        const selectedBarangay = typeof value === 'string' ? value.split(',') : value;

        const barangayIDChecker = selectedBarangay.map(selectedBarangay => {
            const matchingBarangay = filteredBarangayData.find(barangay => barangay.name === selectedBarangay);
            return matchingBarangay ? matchingBarangay.id : null;
        });

        setBarangayFilter(selectedBarangay);
        setbarangayIDChecker(barangayIDChecker);
        //onFilterChange({ disasterFilter, provinceFilter, municipalityFilter, barangayIDChecker: barangayIDChecker,  selectedDate1, selectedDate2, typeofReport });
        onFilterChange({ disasterFilter, provinceFilter, municipalityFilter, barangayFilter: value,  selectedDate1, selectedDate2, typeofReport });
    }

    const handleDateChange1 = (date) => {
        const formattedDate = date ? dayjs(date).format('MM-DD-YYYY') : null;
        setSelectedDate1(formattedDate);
        onFilterChange({
            disasterFilter,
            provinceFilter,
            municipalityFilter,
            barangayFilter,
            selectedDate1: formattedDate,
            selectedDate2,
            typeofReport,
        });
    };
    
    const handleDateChange2 = (date) => {
        const formattedDate = date ? dayjs(date).format('MM-DD-YYYY') : null;
        setSelectedDate2(formattedDate);
        onFilterChange({
            disasterFilter,
            provinceFilter,
            municipalityFilter,
            barangayFilter,
            selectedDate1,
            selectedDate2: formattedDate,
            typeofReport,
        });
    };
    
    const handletypeofReport = (value) => {
        settypeofReport(value.target.value);
        onFilterChange({ disasterFilter, provinceFilter, municipalityFilter, barangayFilter,  selectedDate1, selectedDate2, typeofReport: value.target.value });
    }

    const resetHandler = () => {
        setDisasterFilter([]);
        setProvinceFilter([]);
        setMunicipalityFilter([]);
        setBarangayFilter([]);
        setSelectedDate1(null);
        setSelectedDate2(null);
        settypeofReport('');
        setError('');
        onFilterChange({ disasterFilter: [], provinceFilter: [], municipalityFilter: [], barangayFilter: [],  selectedDate1: null, selectedDate2: null, typeofReport: '' });
    };
    return (
    <>
        {isLoading ? (
            <div className="h-full pt-5 bg-white">
            <h3>Loading data...</h3>
            </div>
        ) : (
            <>
        <div className="mt-4 flex justify-end w-full">
            <Button 
                onClick={resetHandler}
                sx={{
                backgroundColor: '#f87171',
                color: 'white',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#ef4444',
                    boxShadow: 'none', 
                },
            }}
            variant="contained" className="w-full">Reset All</Button>
        </div>
        <div className="mt-4">
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Disaster</InputLabel>
                <Select                                    
                    multiple
                    value={disasterFilter}
                    onChange={disasterFilterChange}
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
                            key={item.disasterName}
                            value={item.disasterName}
                            style={getStyles(item.disasterName, disasterFilter, theme)}
                        >
                            {item.disasterName}
                        </MenuItem>
                        ))}
                    </Select>
            </FormControl>
        </div>
  
        <div className="mt-4">
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Province</InputLabel>
                <Select                                  
                    multiple
                    value={provinceFilter}
                    onChange={provinceFilterChange}
                    input={<OutlinedInput label="Province" />}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                         {selected.map((value) => (
                        <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >
                        {filteredProvinceData.map((item) => (
                         <MenuItem
                            key={item.name}
                            value={item.name}
                            style={getStyles(item.name, provinceFilter, theme)}
                        >
                            {item.name}
                        </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
  
        <div className="mt-4">
            <FormControl sx={{ width: '100%' }}>
                <InputLabel >
                    Municipality
                </InputLabel>
                <Select                 
                    disabled={provinceFilter.length === 0}                
                    multiple
                    value={municipalityFilter}
                    onChange={municipalityFilterChange}
                    input={<OutlinedInput label="Municipality" />}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                         {selected.map((value) => (
                        <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >
                        {filteredMunicipalitiesData.map((item) => (
                         <MenuItem
                            key={item.name}
                            value={item.name}
                            style={getStyles(item.name, provinceFilter, theme)}
                        >
                            {item.name}
                        </MenuItem>
                        ))}
                </Select>               
            </FormControl>
        </div>
        <div className="mt-4">
            <FormControl sx={{ width: '100%' }}>
                <InputLabel >
                    Barangay
                </InputLabel>
                <Select                 
                    disabled={municipalityFilter.length === 0}                
                    multiple
                    value={barangayFilter}
                    onChange={barangayFilterChange}
                    input={<OutlinedInput label="Municipality" />}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                         {selected.map((value) => (
                        <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >
                        {filteredBarangayData.map((item) => (
                         <MenuItem
                            key={item.name}
                            value={item.name}
                            style={getStyles(item.name, barangayFilter, theme)}
                        >
                            {item.name}
                        </MenuItem>
                        ))}
                </Select>              
            </FormControl>
        </div>
        <div className="mt-4">
            <FormControl fullWidth>
                <InputLabel>Type of Report</InputLabel>
                <Select
                    value={typeofReport}
                    label="Type of Report"
                    onChange={handletypeofReport}
                >
                    <MenuItem value={'Initial Report'}>Initial</MenuItem>
                    <MenuItem value={'Progress Report'}>Progress</MenuItem>
                    <MenuItem value={'Terminal Report'}>Terminal</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="mt-4 w-full flex">
            <p className="w-full text-sm">From</p>  
            <p className="w-full text-sm ml-4">To</p>              
        </div>
        <div className="w-full flex pb-4">
            <div className="mr-2 w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        value={selectedDate1}
                        onChange={handleDateChange1}
                        format="MM-DD-YYYY"
                        className="w-full"
                    />
                </LocalizationProvider>
            </div>
            <div className="ml-2 w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={selectedDate2}
                        onChange={handleDateChange2}
                        format="MM-DD-YYYY"
                        className="w-full"
                    />
                </LocalizationProvider>
            </div>
        </div>
        <div className="flex justify-center">
            <p className="text-red-500">{error}</p>
        </div>
        </>
      )}
    </>
  );
}

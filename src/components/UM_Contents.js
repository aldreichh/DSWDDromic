import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Manage_Users from './Manage_Users';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
          <Box sx={{ p: 0, height:'84vh'}}>
            <Typography className="h-full">{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
  
function UM_Contents ({users, provinceIndex, citiesIndex, barangayIndex, disasters}) {
    const [dataSearch, setdataSearch] = useState('');

    const handleDataSearch = (value) => {
        setdataSearch(value.target.value);
    }

    const customHeightStyle = {
        height: '4%'
    }

    const [value, setValue] = useState(0);
    const buttonHandler = (value) => {
        setValue(value);
    };

    return (
    <>
        <div className="w-full h-full -mt-14 md:-mt-16 pt-20 pl-4 pr-4 pb-4 flex justify-center items-center">
            <div className="w-full h-full">
                <div style={customHeightStyle} className="mb-14 block md:flex md:mb-4">
                    <div className={`w-full md:mb-0 mb-2 flex justify-center rounded-sm shadow-md
                                    ${value === 0 ? 'bg-sky-900' : 'bg-sky-600'} text-white`}>
                        <Button
                                sx={{color: 'white'}}
                                className="w-full"
                                onClick={() => buttonHandler(0)} 
                                variant="text">
                                  MANAGE DATA AND USERS
                        </Button>
                    </div>

                </div>
                <div> 
                    {value === 0 && (
                        <div className="w-full flex justify-end items-center ">                     
                            <TextField 
                                className="bg-white w-1/2 md:w-1/5"
                                label="Search Item" 
                                variant="outlined" 
                                size="small"
                                onChange={handleDataSearch}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchOutlinedIcon sx={{ fontSize: 25}} />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </div> 
                    )}       
                    <CustomTabPanel className=" mt-4 h-1/2" value={value} index={0}>
                        <Manage_Users   provinceIndex={provinceIndex} citiesIndex={citiesIndex} dataSearch={dataSearch} 
                                        disasters={disasters} barangayIndex={barangayIndex} users={users}/>
                    </CustomTabPanel>
                </div>
           </div>
        </div>
    </>
    )
}

export default UM_Contents;
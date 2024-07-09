import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditUser_Form from './EditUser_Form';
import Create_User from './Create_User';
import OtherOptions from './OtherOptions';

function createData( 
    userID,
    userName,
    lastName,
    firstName,
    middleName,
    address,
    dateOfBirth,
    provinceAssigned,
    accountCreated,
    role,
    status,
    email,
) {
    return { 
        userID,
        userName,
        lastName,
        firstName,
        middleName,
        address,
        dateOfBirth,
        provinceAssigned,
        accountCreated,
        role,
        status,
        email,
    };
}

const columns = [
  {
    width: 20,
    label: 'User ID',
    dataKey: 'userID',
  },
  {
    width: 40,
    label: 'Username',
    dataKey: 'userName',
  },
  {
    width: 40,
    label: 'Last\u00A0Name',
    dataKey: 'lastName',
  },
  {
    width: 50,
    label: 'First\u00A0Name',
    dataKey: 'firstName',
  },
  {
    width: 40,
    label: 'Middle\u00A0Name',
    dataKey: 'middleName',
  },
  {
    width: 80,
    label: 'Address',
    dataKey: 'address',
  },
  {
    width: 40,
    label: 'Date of Birth',
    dataKey: 'dateOfBirth',
  },
  {
    width: 40,
    label: 'Province\u00A0Assigned',
    dataKey: 'provinceAssigned',
  },
  {
    width: 50,
    label: 'Account Created',
    dataKey: 'accountCreated',
  },
  {
    width: 30,
    label: 'Role',
    dataKey: 'role',
  },
  {
    width: 30,
    label: 'Status',
    dataKey: 'status',
  },
  {
    width: 50,
    label: 'Email',
    dataKey: 'email',
  },
  {
    width: 50,
    label: 'Actions',
    dataKey: 'actions',
    actionsColumn: true,
    },
];


export default function Manage_Users({users, provinceIndex, citiesIndex, barangayIndex, disasters, dataSearch}) {
    const [editformModal, seteditformModal]=useState(false);
    const [createformModal, setcreateformModal] = useState(false);
    const [otherOptionsModal, setotherOptionsModal] = useState(false);
    const [selectedUserData, setselectedUserData] = useState({});
    const provincesArray = provinceIndex.data || [];

    const rows = Array.isArray(users)
    ? users.map((data, index) => {
        const { 
            id,
            username,
            lastName,
            firstName,
            middleName,
            address,
            dateOfBirth,
            provinceAssigned,
            created_at,
            role,
            status,
            email,
    } = data;
    const province = provincesArray.find(province => province.id === provinceAssigned);
    const provinceName = province ? province.name : '';
    return createData(
            id,
            username,
            lastName,
            firstName,
            middleName,
            address,
            dateOfBirth,
            provinceName || 'N/A',
            created_at,
            role,
            status,
            email,
    );
    })
    : [];

    const filteredRows = rows.filter(row => {
      const searchValue = dataSearch.toLowerCase();
  
      // Check if any of the row's data starts with the search value (case-insensitive)
      return Object.values(row).some(value => 
          value && value.toString().toLowerCase().startsWith(searchValue)
      );
    });

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
            height: '50%',
            width: '40%', 
          },
    };

    const style4 = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: '70%',
      bgcolor: 'white',
      boxShadow: 10,
      '@media (min-width: 768px)': {
          height: '50%',
          width: '40%', 
        },
    };

    const style5 = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: '70%',
      bgcolor: 'white',
      boxShadow: 10,
      '@media (min-width: 768px)': {
          height: '80%',
          width: '40%', 
        },
  };
  
    const handleEditData = (data) => {
      setselectedUserData(data);
      seteditformModal(true);
    }

    const handleEditClose = () => {
      seteditformModal(false);
      setcreateformModal(false);
    }

    const handleCreateForm = () => {
      setcreateformModal(true);
    }

    const handleOtherOptionsForm = () => {
      setotherOptionsModal(true);
    }

    
    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };
  
    function fixedHeaderContent() {
      return (
        <TableRow>
          {columns.map((column, columnIndex) => (
            <TableCell
              key={column.dataKey}
              variant="head"
              align={
                columnIndex < 1 
                  ? 'left'
                  : 'center'
              }
              style={{ width: column.width}}
              sx={{
                backgroundColor: '#0284c7',
                color: 'white',
                overflow:'hidden',
            }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      );
    }
  
    function rowContent(_index, row) {
      return (
        <React.Fragment>
          {columns.map((column,columnIndex) => (
            <TableCell key={column.dataKey}  align={
                columnIndex < 1 
                  ? 'left'
                  : 'center'}
                  sx={{
                    overflow: 'hidden',
                    color: column.dataKey === 'status'
                        ? row['status'] === 'Active' ? 'green' : 'red'
                        : 'inherit',
                  }}
              >
            {column.dataKey === 'actions' ? (
                <div className='flex mx-2 justify-center '>
                <Button
                    sx={{
                        fontSize: '11px',
                        color: 'white',
                        backgroundColor: '#22c55e', 
                        '&:hover': {
                            backgroundColor: '#16a34a',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={() => handleEditData(row)}
                    >
                    Edit Data
                </Button>
                </div>
                ) : (
                    row[column.dataKey] != null ? row[column.dataKey] : 'N/A'
                )}
            </TableCell>
          ))}
        </React.Fragment>
      );
    }

    const handleOtherOptionsClose = () => {
        setotherOptionsModal(false);
    };
  
    return (
    <>
        <Modal open={editformModal} onClose={handleEditClose}>
            <Box sx={style}>
                {selectedUserData &&  <EditUser_Form provinceIndex={provinceIndex} userData={selectedUserData} onClose={handleEditClose}/>}
            </Box>
        </Modal>
        <Modal open={createformModal} onClose={handleEditClose}>
            <Box sx={style4}>
               <Create_User provinceIndex={provinceIndex} users={users} onClose={handleEditClose}/>
            </Box>
        </Modal>
        <Modal open={otherOptionsModal} onClose={handleOtherOptionsClose}>
            <Box sx={style5}>
               <OtherOptions provinceIndex={provinceIndex} citiesIndex={citiesIndex} barangayIndex={barangayIndex} disasters={disasters} onClose={handleOtherOptionsClose}/>
            </Box>
        </Modal>
        <Paper style={{ height: '88%', width: '100%'}}>
            <TableVirtuoso
            data={filteredRows} // Use the data from the API response
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            />
            <TableContainer className="bg-sky-600 flex justify-end items-center overflow-auto" sx={{height: '6%'}}>
                <div className="h-5/6 flex justify-center items-center mr-5">
                  <Button
                    onClick={handleOtherOptionsForm}
                    variant='contained'
                    sx={{
                      boxShadow: 'none', 
                      overflow: 'hidden',
                      height: '80%',
                      backgroundColor: '#f87171',
                      '&:hover': {
                        backgroundColor: '#ef4444',                
                    }, }}     
                  > Other Data Options
                  </Button>
                </div>
                <div className="h-5/6 flex justify-center items-center mr-5">
                  <Button
                    onClick={handleCreateForm}
                    variant='contained'
                    sx={{
                      boxShadow: 'none', 
                      overflow: 'hidden',
                      height: '80%',
                      backgroundColor: '#22c55e',
                      '&:hover': {
                        backgroundColor: '#16a34a',                
                    }, }}     
                  > Create Account
                  </Button>
                </div>
          </TableContainer>
        </Paper>
    </>
    );
  }
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditData_PerReport from './EditData_PerReport';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the xlsx library

function createData(
    id, 
    reportID, 
    provinceName, 
    municipalityName, 
    barangayName, 
    displacedFamiliesInsideEC, 
    displacedFamiliesOutsideEC, 
    totalServedNumberFamilies, 
    totalServedNumberPersons,
    damagedHousesPartially,
    damagedHousesTotally,
    costOfAssistanceDSWD,
    costOfAssistanceLGUAffected,
    costOfAssistanceLGUDonor,
    costOfAssistanceNGO,
    reportType,
    reportedBy,
    reportDateCreated,
    ) {
  return { 
    id,
    reportID, 
    provinceName, 
    municipalityName, 
    barangayName, 
    displacedFamiliesInsideEC, 
    displacedFamiliesOutsideEC, 
    totalServedNumberFamilies, 
    totalServedNumberPersons,
    damagedHousesPartially,
    damagedHousesTotally,
    costOfAssistanceDSWD,
    costOfAssistanceLGUAffected,
    costOfAssistanceLGUDonor,
    costOfAssistanceNGO,
    reportType,
    reportedBy,
    reportDateCreated, 
    };
}

const columns = [
  {
    width: 50,
    label: 'Province',
    dataKey: 'provinceName',
  },
  {
    width: 50,
    label: 'Municipality',
    dataKey: 'municipalityName',
  },
  {
    width: 50,
    label: 'Barangay',
    dataKey: 'barangayName',
  },
  {
    width: 50,
    label: 'Displace Families Inside EC',
    dataKey: 'displacedFamiliesInsideEC',
  },
  {
    width: 50,
    label: 'Displace Families Outside EC',
    dataKey: 'displacedFamiliesOutsideEC',
  },
  {
    width: 50,
    label: 'Total Affected Number Families',
    dataKey: 'totalServedNumberFamilies',
  },
  {
    width: 50,
    label: 'Total Affected Number Persons',
    dataKey: 'totalServedNumberPersons',
  },
  {
    width: 50,
    label: 'Damaged Houses Partially',
    dataKey: 'damagedHousesPartially',
  },
  {
    width: 50,
    label: 'Damaged Houses Totally',
    dataKey: 'damagedHousesTotally',
  },
  {
    width: 50,
    label: 'Cost Of Assistance (DSWD)',
    dataKey: 'costOfAssistanceDSWD',
  },
  {
    width: 50,
    label: 'Cost Of Assistance (LGU Affected)',
    dataKey: 'costOfAssistanceLGUAffected',
  },
  {
    width: 50,
    label: 'Cost Of Assistance (LGU Donor)',
    dataKey: 'costOfAssistanceLGUDonor',
  },
  {
    width: 50,
    label: 'Cost Of Assistance (NGO)',
    dataKey: 'costOfAssistanceNGO',
  },
  {
    width: 50,
    label: 'Report Type',
    dataKey: 'reportType',
  },
  {
    width: 50,
    label: 'Reported By',
    dataKey: 'reportedBy',
  },
  {
    width: 50,
    label: 'Report Date Created',
    dataKey: 'reportDateCreated',
  },
  {
    width: 70,
    label: 'Actions',
    dataKey: 'actions',
    actionsColumn: true,
  },
];

export default function EditData_Table({ disasterName, reportID, disasters, provinceIndex, citiesIndex, barangayIndex, reports}) {
    const [tableData, settableData] = useState([]);
    const [editDataOpen, seteditDataOpen] = useState(false);
    const [contents, setContents] = useState([]);

    const style1 = {  
        width: 150
    }
    const style2 = {
        width: 100
    }
    const style3 = {
        width: 200
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: '90%',
      bgcolor: 'white',
      boxShadow: 10,
      borderRadius: '0.35rem',
      '@media (min-width: 768px)': {
          width: '50%', // Full width for screens wider than 768px (adjust the breakpoint as needed)
        },
    };

    const editData = (data) => {
      setContents(data);
      seteditDataOpen(true);
    }

    const handleClickClose = () => {
      seteditDataOpen(false);
    }

    /*
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/reports')
          .then(response => setReports(response.data.reports))
          .catch(error => console.error('Error fetching reports:', error));
        axios.get('http://127.0.0.1:8000/api/getindexdisaster')
          .then(response => setDisasters(response.data.data))
          .catch(error => console.error('Error fetching disasters:', error));
        axios.get('http://127.0.0.1:8000/api/provincesindex')
          .then(response => setprovinceIndex(response.data))
          .catch(error => console.error('Error fetching reports:', error));
        axios.get('http://127.0.0.1:8000/api/citiesindex')
          .then(response => setcitiesIndex(response.data))
          .catch(error => console.error('Error fetching reports:', error));
        axios.get('http://127.0.0.1:8000/api/barangaysindex')
          .then(response => setbarangayIndex(response.data))
          .catch(error => console.error('Error fetching reports:', error));
    }, []);
    */

    useEffect(() => {
        if (
            reports.length > 0 &&
            disasters.length > 0 &&
            provinceIndex.data &&
            citiesIndex.data &&
            barangayIndex.data
        ) {
          const updatedReports = [];

          reports.forEach((report) => {
            if (report.reportID === reportID) {
              const disaster = disasters.find((d) => d.id === report.disasterID);
              const province = provinceIndex.data.find((p) => p.id === report.provincesID);
              const cities = citiesIndex.data.find((c) => c.id === report.citiesID);
              const barangay = barangayIndex.data.find((b) => b.id === report.barangaysID);
      
              const updatedReport = {
                id: report.id,
                reportID: report.reportID,
                disasterName: disaster ? disaster.disasterName : 'Unknown Disaster',
                provinceName: province ? province.name : 'Unknown Province',
                municipalityName: cities ? cities.name : 'Unknown Municipality',
                barangayName: barangay ? barangay.name : 'Unknown Barangay',
                disasterInfo: report.disasterInfo,
                displacedFamiliesInsideEC: report.displacedFamiliesInsideEC, 
                displacedFamiliesOutsideEC: report.displacedFamiliesOutsideEC, 
                totalServedNumberFamilies: report.totalServedNumberFamilies, 
                totalServedNumberPersons: report.totalServedNumberPersons,
                damagedHousesPartially: report.damagedHousesPartially,
                damagedHousesTotally: report.damagedHousesTotally,
                costOfAssistanceDSWD: report.costOfAssistanceDSWD,
                costOfAssistanceLGUAffected: report.costOfAssistanceLGUAffected,
                costOfAssistanceLGUDonor: report.costOfAssistanceLGUDonor,
                costOfAssistanceNGO: report.costOfAssistanceNGO,
                reportType: report.reportType,
                reportedBy: report.reportedBy,
                reportDateCreated: report.reportDateCreated,
                dateOfIncident: report.dateOfIncident,
                timeOfIncident: report.timeOfIncident,
              };
              updatedReports.push(updatedReport);
            }
          });
          settableData(updatedReports);
        }
      }, [
        reports,
        disasters,
        provinceIndex.data,
        citiesIndex.data,
        barangayIndex.data,
    ]);
      
    const rows = tableData.map((data, index) => {
        const {
            id,
            reportID, 
            provinceName, 
            municipalityName, 
            barangayName, 
            displacedFamiliesInsideEC, 
            displacedFamiliesOutsideEC, 
            totalServedNumberFamilies, 
            totalServedNumberPersons,
            damagedHousesPartially,
            damagedHousesTotally,
            costOfAssistanceDSWD,
            costOfAssistanceLGUAffected,
            costOfAssistanceLGUDonor,
            costOfAssistanceNGO,
            reportType,
            reportedBy,
            reportDateCreated,
        } = data;
        return createData(
            id,
            reportID, 
            provinceName, 
            municipalityName, 
            barangayName, 
            displacedFamiliesInsideEC, 
            displacedFamiliesOutsideEC, 
            totalServedNumberFamilies, 
            totalServedNumberPersons,
            damagedHousesPartially,
            damagedHousesTotally,
            costOfAssistanceDSWD,
            costOfAssistanceLGUAffected,
            costOfAssistanceLGUDonor,
            costOfAssistanceNGO,
            reportType,
            reportedBy,
            reportDateCreated,
        );
    });

    const displacedFamiliesInsideECTotal = rows.reduce((sum, row) => sum + (row.displacedFamiliesInsideEC || 0), 0);
    const displacedFamiliesOutsideECTotal = rows.reduce((sum, row) => sum + (row.displacedFamiliesOutsideEC || 0), 0);
    const totalDisplacedFamiliesTotal = displacedFamiliesInsideECTotal + displacedFamiliesOutsideECTotal;

    const totalTotalServedNumberFamilies = rows.reduce((sum, row) => sum + (row.totalServedNumberFamilies || 0), 0);
    const totalTotalServedNumberPersons = rows.reduce((sum, row) => sum + (row.totalServedNumberPersons || 0), 0);
    const totalServedNumber = totalTotalServedNumberFamilies + totalTotalServedNumberPersons;

    const totalDamagedHousesPartially = rows.reduce((sum, row) => sum + (row.damagedHousesPartially || 0), 0);
    const totalDamagedHousesTotally = rows.reduce((sum, row) => sum + (row.damagedHousesTotally || 0), 0);
    const totalDamagedHouses = totalDamagedHousesPartially + totalDamagedHousesTotally;

    const totalCostOfAssistanceDSWD = rows.reduce((sum, row) => sum + (row.costOfAssistanceDSWD || 0), 0);
    const totalCostOfAssistanceLGUAffected = rows.reduce((sum, row) => sum + (row.costOfAssistanceLGUAffected || 0), 0);
    const totalCostOfAssistanceLGUDonor = rows.reduce((sum, row) => sum + (row.costOfAssistanceLGUDonor || 0), 0);
    const totalCostOfAssistanceNGO = rows.reduce((sum, row) => sum + (row.costOfAssistanceNGO || 0), 0);
    const totalCostOfAssistance = totalCostOfAssistanceDSWD + totalCostOfAssistanceLGUAffected + totalCostOfAssistanceLGUDonor + totalCostOfAssistanceNGO;

    const exportToExcel = () => {
        const totals = {
            provinceName: 'Total', 
            municipalityName: '',
            barangayName: '',
            displacedFamiliesInsideEC: displacedFamiliesInsideECTotal,
            displacedFamiliesOutsideEC: displacedFamiliesOutsideECTotal,
            totalServedNumberFamilies: totalTotalServedNumberFamilies,
            totalServedNumberPersons: totalTotalServedNumberPersons,
            damagedHousesPartially: totalDamagedHousesPartially,
            damagedHousesTotally: totalDamagedHousesTotally,
            costOfAssistanceDSWD: totalCostOfAssistanceDSWD,
            costOfAssistanceLGUAffected: totalCostOfAssistanceLGUAffected,
            costOfAssistanceLGUDonor: totalCostOfAssistanceLGUDonor,
            costOfAssistanceNGO: totalCostOfAssistanceNGO,
          };

        const rowsWithTotals = [...rows, totals];
        const worksheet = XLSX.utils.json_to_sheet(rowsWithTotals);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DisasterReport');
        XLSX.writeFile(workbook, 'disaster_report.xlsx');
    };
    
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
                columnIndex < 3 
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
            <TableCell
            sx={{
              overflow: 'hidden',
            }}
            key={column.dataKey}
            align={columnIndex < 3 ? 'left' : 'center'}
          >
            {column.dataKey === 'actions' ? (
              <div className='flex mx-2 justify-center'>
                <Button
                  sx={{
                    fontSize: '11px',
                    color: 'white',
                    marginRight: '5px',
                    backgroundColor: '#f87171',
                    '&:hover': {
                      backgroundColor: '#dc2626',
                      boxShadow: 'none',
                    },
                  }}
                  onClick={() => editData(row)}
                >
                  Edit Data
                </Button>
                {/* You can add more buttons here if needed */}
              </div>
            ) : (
              row[column.dataKey] != null ? row[column.dataKey] : '0'
            )}
          </TableCell>
          ))}
        </React.Fragment>
      );
    }
  
    return (
      <>
        <Modal open={editDataOpen} onClose={handleClickClose}>
          <Box sx={style}>
              <EditData_PerReport 
                contents={contents} 
                provinceIndex = {provinceIndex}
                disasters={disasters}
                citiesIndex={citiesIndex}
                barangayIndex={barangayIndex}
                disasterName={disasterName}
              />
          </Box>
        </Modal>
        <Paper style={{ height: '95%', width: '100%' }}>
          <TableVirtuoso
            data={rows} 
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
          <TableContainer className="bg-sky-600 h-10px" >
            <Table sx={{
                  '& .MuiTableCell-sizeMedium': {
                  padding: '16px 10px',
                  color: 'white',      
              },
            }}>
              <TableHead>
                <TableRow>
                  <TableCell style={style1}  align="left" >Grand Total</TableCell>
                  <TableCell style={style2}  align="center">{totalDisplacedFamiliesTotal}</TableCell>
                  <TableCell style={style2}  align="center">{totalServedNumber}</TableCell>
                  <TableCell style={style2}  align="center">{totalDamagedHouses}</TableCell>
                  <TableCell style={style3}  align="center">{totalCostOfAssistance}</TableCell>
                  <TableCell style={style2} align="center"><button className="px-3 bg-green-500 rounded-md" onClick={exportToExcel}>Export Data</button></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      </>
    );
  }
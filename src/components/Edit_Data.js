import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TableVirtuoso } from 'react-virtuoso';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditData_Table from './EditData_Table';
import AddData_PerReport from './AddData_PerReport';

function createData(
        reportID,
        disasterName,
        disasterInfo,
        provinceName,
        reportType,
        dateOfIncident,
        timeOfIncident,
        reportDateCreated,
        municipalityName,
        barangay,
        displacedFamiliesInsideEC,
        displacedFamiliesOutsideEC,
        totalServedNumberFamilies,
        totalServedNumberPersons,
        damagedHousesTotally,
        damagedHousesPartially,
        costOfAssistanceDSWD,
        costOfAssistanceLGUAffected,
        costOfAssistanceLGUDonor,
        costOfAssistanceNGO,
) {
    return {
        reportID,
        disasterName,
        disasterInfo,
        provinceName,
        reportType,
        dateOfIncident,
        timeOfIncident,
        reportDateCreated,
        municipalityName,
        barangay,
        displacedFamiliesInsideEC,
        displacedFamiliesOutsideEC,
        totalServedNumberFamilies,
        totalServedNumberPersons,
        damagedHousesTotally,
        damagedHousesPartially,
        costOfAssistanceDSWD,
        costOfAssistanceLGUAffected,
        costOfAssistanceLGUDonor,
        costOfAssistanceNGO,
    };
}
  
  const columns = [
    {
        width: 50,
        label: 'Report ID',
        dataKey: 'reportID',
    },
    {
        width: 112,
        label: 'Disaster',
        dataKey: 'disasterName',
    },
    {
        width: 200,
        label: 'Disaster Details',
        dataKey: 'disasterInfo',
    },
    {
        width: 70,
        label: 'Province',
        dataKey: 'provinceName',
    },
    {
        width: 70,
        label: 'Type\u00A0of\u00A0Report',
        dataKey: 'reportType',
    },
    {
        width: 100,
        label: 'Date of Incident',
        dataKey: 'dateOfIncident',
    },
    {
        width: 100,
        label: 'Time of Incident',
        dataKey: 'timeOfIncident',
    },
    {
        width: 112,
        label: 'Date Created',
        dataKey: 'reportDateCreated',
    },
    {
        width: 120,
        label: 'Actions',
        dataKey: 'actions',
        actionsColumn: true,
    },
];

function Edit_Data({disasters, provinceIndex, citiesIndex, barangayIndex, reports, dataSearch}) {
    const [tableData, settableData] = useState([]);
    const [allData, setallData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const storedDataString = localStorage.getItem('data');
    const storedData = JSON.parse(storedDataString);
    const province_ID = storedData.provinceAssigned;
      //store filtered data
    useEffect(() => {
        if (
            reports.length > 0 &&
            disasters.length > 0 &&
            provinceIndex.data &&
            citiesIndex.data &&
            barangayIndex.data
        ) {
          const processedReportIDs = new Set(); // Keep track of processed report IDs
          const updatedReports = [];

          reports.forEach((report) => {
            const groupReports = reports.filter((r) => r.reportID === report.reportID);

        // Check if any item within the group has reportType 'Terminal'
        const terminalReportFound = groupReports.some((r) => r.reportType === 'Terminal');

        // Check if any item within the group has reportType 'Progress'
        const progressReportFound = groupReports.some((r) => r.reportType === 'Progress');
            // Check if the reportID is already processed
            if (!processedReportIDs.has(report.reportID) && (storedData.role === 'Admin' || report.provincesID === province_ID)) {
              const disaster = disasters.find((d) => d.id === report.disasterID);
              const province = provinceIndex.data.find((p) => p.id === report.provincesID);
              const cities = citiesIndex.data.find((c) => c.id === report.citiesID);
              const barangay = barangayIndex.data.find((b) => b.id === report.barangaysID);
      
              const updatedReport = {
                reportID: report.reportID,
                disasterName: disaster ? disaster.disasterName : 'Unknown Disaster',
                provinceName: province ? province.name : 'Unknown Province',
                municipalityName: cities ? cities.name : 'Unknown Municipality',
                barangayName: barangay ? barangay.name : 'Unknown Barangay',
                disasterInfo: report.disasterInfo,
                totalServedNumberFamilies: report.totalServedNumber,
                displacedFamiliesTotal: report.displacedFamiliesTotal,
                damagedHousesTotal: report.damagedHousesTotal,
                costOfAssistanceTotal: report.costOfAssistanceTotal,
                reportType: terminalReportFound ? 'Terminal' : (progressReportFound ? 'Progress' : 'Initial'),
                reportDateCreated: report.reportDateCreated,
                dateOfIncident: report.dateOfIncident,
                timeOfIncident: report.timeOfIncident,
              };
              updatedReports.push(updatedReport);
              processedReportIDs.add(report.reportID);
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

      //store all data
    useEffect(() => {
        if (
            reports.length > 0 &&
            disasters.length > 0 &&
            provinceIndex.data &&
            citiesIndex.data &&
            barangayIndex.data
        ) {
            const updatedReports = reports.map((report) => {
               
                const disaster = disasters.find((d) => d.id === report.disasterID);
                const province = provinceIndex.data.find((p) => p.id === report.provincesID);
                const cities = citiesIndex.data.find((c) => c.id === report.citiesID);
                const barangay = barangayIndex.data.find((b) => b.id === report.barangaysID);

                return {
                    reportID: report.reportID,
                    disasterName: disaster ? disaster.disasterName : 'Unknown Disaster',
                    provinceName: province ? province.name : 'Unknown Province',
                    municipalityName: cities ? cities.name : 'Unknown Municipality',
                    barangay: barangay ? barangay.name : 'Unknown Barangay',
                    disasterInfo: report.disasterInfo,
                    displacedFamiliesInsideEC: report.displacedFamiliesInsideEC, 
                    displacedFamiliesOutsideEC: report.displacedFamiliesOutsideEC, 
                    totalServedNumberFamilies: report.totalServedNumberFamilies,
                    totalServedNumberPersons: report.totalServedNumberPersons,
                    damagedHousesTotally: report.damagedHousesTotally,
                    damagedHousesPartially: report.damagedHousesPartially,
                    costOfAssistanceDSWD: report.costOfAssistanceDSWD,
                    costOfAssistanceLGUAffected: report.costOfAssistanceLGUAffected,
                    costOfAssistanceLGUDonor: report.costOfAssistanceLGUDonor,
                    costOfAssistanceNGO: report.costOfAssistanceNGO,           
                    reportType: report.reportType,
                    reportDateCreated: report.reportDateCreated,
                    dateOfIncident: report.dateOfIncident,
                    timeOfIncident: report.timeOfIncident,
                };
            });
            setallData(updatedReports);
        }
    }, [reports, disasters, provinceIndex.data, citiesIndex.data, barangayIndex.data]);

    const filteredTableData = tableData.filter(data => {
        const searchValue = dataSearch.toLowerCase();
    
        // Check if any of the data's values starts with the search value (case-insensitive)
        return Object.values(data).some(value => 
            value && String(value).toLowerCase().startsWith(searchValue)
        );
    });

    const sortedTableData = filteredTableData.sort((a, b) => {
        const dateA = new Date(a.reportDateCreated);
        const dateB = new Date(b.reportDateCreated);
    
        return dateB - dateA;
    });
    
    const rows = sortedTableData.map((data, index) => {
        const {
            reportID,
            disasterName,
            disasterInfo,
            provinceName,
            reportType,
            dateOfIncident,
            timeOfIncident,
            reportDateCreated,
        } = data;
        return createData(
            reportID,
            disasterName,
            disasterInfo,
            provinceName,
            reportType,
            dateOfIncident,
            timeOfIncident,
            reportDateCreated,
        );
    });
    const selecteddata = allData.map((data, index) => {
        const {
            reportID,
            disasterName,
            disasterInfo,
            provinceName,
            reportType,
            dateOfIncident,
            timeOfIncident,
            reportDateCreated,
            municipalityName,
            barangay,
            displacedFamiliesInsideEC,
            displacedFamiliesOutsideEC,
            totalServedNumberFamilies,
            totalServedNumberPersons,
            damagedHousesTotally,
            damagedHousesPartially,
            costOfAssistanceDSWD,
            costOfAssistanceLGUAffected,
            costOfAssistanceLGUDonor,
            costOfAssistanceNGO,
        } = data;
        return createData(
            reportID,
            disasterName,
            disasterInfo,
            provinceName,
            reportType,
            dateOfIncident,
            timeOfIncident,
            reportDateCreated,
            municipalityName,
            barangay,
            displacedFamiliesInsideEC,
            displacedFamiliesOutsideEC,
            totalServedNumberFamilies,
            totalServedNumberPersons,
            damagedHousesTotally,
            damagedHousesPartially,
            costOfAssistanceDSWD,
            costOfAssistanceLGUAffected,
            costOfAssistanceLGUDonor,
            costOfAssistanceNGO,
        );
    });


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: '#0284c7',
        boxShadow: 10,
        borderRadius: '0.35rem',
    };

    const style2 = {
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

    const [viewDetailsOpen, setviewDetailsOpen] = useState(false);
    const [addDataOpen, setaddDataOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleViewDataOpen = (selecteddata) => {
        setSelectedData(selecteddata);
        setviewDetailsOpen(true);
    }

    const handleAddDataOpen = (selecteddata) => {
        setSelectedData(selecteddata);
        setaddDataOpen(true);
    }
   
    const handleClickClose = () => {
        setviewDetailsOpen(false);
        setaddDataOpen(false);
    }

    const rowContent = (_index, row) => (
        <React.Fragment>
        {columns.map((column) => (
            <TableCell key={column.dataKey}  align={column.dataKey === 'actions' ? 'center' : 'left' }>
                    {column.dataKey === 'actions' ? (
                        <div className='flex mx-2 justify-center '>
                        <Button
                            sx={{
                                fontSize: '11px',
                                color: 'white',
                                marginRight: '5px',
                                backgroundColor: '#f87171', // Set the background color here
                                '&:hover': {
                                    backgroundColor: '#dc2626',
                                    boxShadow: 'none',
                                },
                            }}
                            onClick={() => handleViewDataOpen(row)}
                            >
                            View Details
                        </Button>
                        <Button
                            sx={{
                                fontSize: '11px',
                                color: 'white',
                                backgroundColor: '#16a34a', // Set the background color here
                                '&:hover': {
                                    backgroundColor: '#16a34a',
                                    boxShadow: 'none',
                                },
                            }}
                            onClick={() => handleAddDataOpen(row)}
                            disabled={row.reportType === 'Terminal'}
                            >
                            Add Data
                        </Button>
                    </div>
                ) : (
                    row[column.dataKey] != null ? row[column.dataKey] : 'N/A'
                )}
            </TableCell>
        ))}
    </React.Fragment>
    );

    return (
    <> 
    <Modal open={viewDetailsOpen} onClose={handleClickClose}>
        <Box sx={style}>
            {selectedData && <EditData_Table
                disasters={disasters}
                provinceIndex={provinceIndex}
                citiesIndex={citiesIndex}
                barangayIndex={barangayIndex}
                reports={reports}
                reportID={selectedData.reportID} 
                disasterName={selectedData.disasterName}
                />}
        </Box>
    </Modal>
    <Modal open={addDataOpen} onClose={handleClickClose}>
        <Box sx={style2}>
            {selectedData && <AddData_PerReport 
            provinceIndex={provinceIndex}
            disasters={disasters}
            citiesIndex={citiesIndex}
            barangayIndex={barangayIndex}
            reportID={selectedData.reportID} 
            reportDetails={selectedData.disasterInfo}
            timeOfIncident={selectedData.timeOfIncident}
            disasterName={selectedData.disasterName}
            dateOfIncident={selectedData.dateOfIncident}
            />}
        </Box>
    </Modal>
        {isLoading ? (
            <div className="h-full pt-5 bg-white">
            <h3>Loading data...</h3>
            </div>
        ) : (            
            <Paper style={{ height: '93%', width: '100%' }}>
                <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
                />
            </Paper>
        )}
    </>
    );
    }

    const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
    <TableContainer {...props} ref={ref} />
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
                {columns.map((column) => (
                    <TableCell
                    className="overflow-hidden"
                    key={column.dataKey}
                    variant="head"
                    align={column.dataKey === 'actions' ? 'center' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: '#0284c7',
                        color: 'white',
                    }}
                    >
                    {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

export default Edit_Data;

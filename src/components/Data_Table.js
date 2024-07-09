import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the xlsx library

function createData(id, disasterName, provinceName, municipalityName, barangayName, affectedfamily, displacedfamily, damagedhouses, costofassistance, typeofreport, dateOfIncident, timeOfIncident) {
  return { id, disasterName, provinceName, municipalityName, barangayName, affectedfamily, displacedfamily, damagedhouses, costofassistance, typeofreport, dateOfIncident, timeOfIncident };
}

const columns = [
  {
    width: 112,
    label: 'Disaster',
    dataKey: 'disasterName',
  },
  {
    width: 80,
    label: 'Province',
    dataKey: 'provinceName',
  },
  {
    width: 80,
    label: 'Municipality',
    dataKey: 'municipalityName',
  },
  {
    width: 80,
    label: 'Barangay',
    dataKey: 'barangayName',
  },
  {
    width: 112,
    label: 'Affected\u00A0Families',
    dataKey: 'affectedfamily',
    format: (affectedfamily) => affectedfamily.toLocaleString('en-US'),
  },
  {
    width: 112,
    label: 'Displaced\u00A0Families',
    dataKey: 'displacedfamily',
    numeric: true,
    format: (displacedfamily) => displacedfamily.toLocaleString('en-US'),
  },
  {
    width: 112,
    label: 'Damaged\u00A0Houses',
    dataKey: 'damagedhouses',
    numeric: true,
    format: (damagedhouses) => damagedhouses.toLocaleString('en-US'),
  },
  {
    width: 112,
    label: 'Cost\u00A0of\u00A0Assistance',
    dataKey: 'costofassistance',
    numeric: true,
    format: (costofassistance) => costofassistance.toLocaleString('en-US'),
  },
  {
    width: 112,
    label: 'Type\u00A0of\u00A0Report',
    dataKey: 'typeofreport',
  },
  {
    width: 100,
    label: 'Date',
    dataKey: 'dateOfIncident',
  },
  {
    width: 70,
    label: 'Time',
    dataKey: 'timeOfIncident',
  },
];

function Data_Table({ 
        sortOrder, 
        timeFrame,
        disasterFilter, 
        provinceFilter, 
        municipalityFilter,
        barangayFilter,
        selectedDate1,
        selectedDate2,
        typeofReport,
        disasters,
        provinceIndex,
        citiesIndex,
        barangayIndex,
        showExportButton,
      }) {
  const [reports, setReports] = useState([]);
  const [tableData, settableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const reportsResponse = await axios.get('http://127.0.0.1:8000/api/reports');
        setReports(reportsResponse.data.reports);
      } catch (error) {
        setIsLoading(true);
        console.error('Error fetching reports data:', error);
      } finally {
        setIsLoading(false); // Set loading indicator back to false
      }
  };
    // Fetch initial reports data
    fetchData();
    // Set up interval to fetch reports every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
  
    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    if (
      reports.length > 0 &&
      disasters.length > 0 &&
      provinceIndex.data &&
      citiesIndex.data &&
      barangayIndex.data
    ) {
      const filteredReports = reports.filter((report) => {
        const date = new Date(report.dateOfIncident);
        const month = date.getMonth() + 1; // Months are zero-based
  
        // Apply timeFrame filter
        if (timeFrame === 'noSemSort') {
          return true; // Include all reports without semester sorting
        } else if (timeFrame === 'firstSem') {
          // Include reports from January to June (1 to 6)
          return month >= 1 && month <= 6;
        } else if (timeFrame === 'secondSem') {
          // Include reports from July to December (7 to 12)
          return month >= 7 && month <= 12;
        }
  
        return false;
      });
  
      const updatedReports = filteredReports
        .map((report) => {
          const disaster = disasters.find((d) => d.id === report.disasterID);
          const province = provinceIndex.data.find((p) => p.id === report.provincesID);
          const cities = citiesIndex.data.find((c) => c.id === report.citiesID);
          const barangay = barangayIndex.data.find((b) => b.id === report.barangaysID);
  
          return {
            disasterName: disaster ? disaster.disasterName : 'Unknown Disaster',
            provinceName: province ? province.name : 'Unknown Province',
            municipalityName: cities ? cities.name : 'Unknown Municipality',
            barangayName: barangay ? barangay.name : 'Unknown Barangay',
            totalServedNumberFamilies: report.totalServedNumber,
            displacedFamiliesTotal: report.displacedFamiliesTotal,
            damagedHousesTotal: report.damagedHousesTotal,
            costOfAssistanceTotal: report.costOfAssistanceTotal,
            reportType: report.reportType,
            dateOfIncident: report.dateOfIncident,
            timeOfIncident: report.timeOfIncident,
          };
        })
        .filter((updatedReport) => {
          // Apply date range filter
          const date = new Date(updatedReport.dateOfIncident);
          if (
            (selectedDate1 && selectedDate2) &&
            (date < new Date(selectedDate1) || date > new Date(selectedDate2))
          ) {
            return false;
          }
          // Apply other filters using logical OR (||) for multiple selections
          const disasterMatch =
            disasterFilter.length === 0 ||
            disasterFilter.includes(updatedReport.disasterName);
          const provinceMatch =
            provinceFilter.length === 0 ||
            provinceFilter.includes(updatedReport.provinceName);
          const municipalityMatch =
            municipalityFilter.length === 0 ||
            municipalityFilter.includes(updatedReport.municipalityName);
          const barangayMatch =
            barangayFilter.length === 0 ||
            barangayFilter.includes(updatedReport.barangayName);
          const typeofReportMatch =
            typeofReport.length === 0 || typeofReport.includes(updatedReport.reportType);
      
          return (
            disasterMatch &&
            provinceMatch &&
            municipalityMatch &&
            barangayMatch &&
            typeofReportMatch
          );
        });
  
        updatedReports.sort((a, b) => {
          const dateTimeA = new Date(`${a.dateOfIncident}T${a.timeOfIncident}`);
          const dateTimeB = new Date(`${b.dateOfIncident}T${b.timeOfIncident}`);
       
          if (sortOrder === 'latest') {
             return dateTimeB - dateTimeA;
          } else if (sortOrder === 'oldest') {
             return dateTimeA - dateTimeB;
          } else {
             // Handle other sorting criteria if needed
             return 0;
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
    sortOrder,
    timeFrame,
    selectedDate1,
    selectedDate2,
    disasterFilter,
    provinceFilter,
    municipalityFilter,
    barangayFilter,
    typeofReport,
  ]);

  const rows = tableData.map((data, index) => {
    const {
      disasterName,
      provinceName,
      municipalityName,
      barangayName,
      totalServedNumberFamilies,
      displacedFamiliesTotal,
      damagedHousesTotal,
      costOfAssistanceTotal,
      reportType,
      dateOfIncident,
      timeOfIncident
    } = data;
    return createData(
      disasterName,
      disasterName,
      provinceName,
      municipalityName,
      barangayName,
      totalServedNumberFamilies,
      displacedFamiliesTotal,
      damagedHousesTotal,
      costOfAssistanceTotal,
      reportType,
      dateOfIncident,
      timeOfIncident
    );
  });

  const rowContent = (_index, row) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align={'left'} sx={{
          overflow: 'hidden',
        }}>
            {row[column.dataKey] != null ? row[column.dataKey] : 'N/A'}
        </TableCell>
      ))}
    </React.Fragment>
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DisasterReport');
    XLSX.writeFile(workbook, 'disaster_report.xlsx');
  };

  const AffectedFamily = rows.reduce((acc, curr) => acc + curr.affectedfamily, 0).toLocaleString('en-US');
  const DisplacedFamily = rows.reduce((acc, curr) => acc + curr.displacedfamily, 0).toLocaleString('en-US');
  const DamagedHouse = rows.reduce((acc, curr) => acc + curr.damagedhouses, 0).toLocaleString('en-US');
  const CostOfAssistance = rows.reduce((acc, curr) => acc + curr.costofassistance, 0).toLocaleString('en-US');

  const style1 = {
    width: 112
  }
  const style2 = {
    width: 80
  }
  const style3 = {
    width: 80
  }
  const style4 = {
    width: 80
  }
  const style5 = {
    width: 112
  }
  const style6 = {
    width: 112
  }
  const style7 = {
    width: 112
  }
  const style8 = {
    width: 112
  }
  const style9 = {
    width: 112
  }
  const style10 = {
    width: 170
  }

  return (
    <>
      {isLoading ? (
        <div className="h-full pt-5 bg-white">
          <h3>Loading data...</h3>
        </div>
      ) : (
      <Paper style={{ height: '90%', width: '100%' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
        <TableContainer className="bg-sky-600 ">
          <Table sx={{
            '& .MuiTableCell-sizeMedium': {
              padding: '16px 10px',
              color: 'white',
            },
          }}>
            <TableHead>
              <TableRow>
                <TableCell style={style1} className="" align="left" >Grand Total</TableCell>
                <TableCell style={style2} ></TableCell>
                <TableCell style={style3} ></TableCell>
                <TableCell style={style4} ></TableCell>
                <TableCell style={style5} align="left">{AffectedFamily}</TableCell>
                <TableCell style={style6} align="left">{DisplacedFamily}</TableCell>
                <TableCell style={style7} align="left">{DamagedHouse}</TableCell>
                <TableCell style={style8} align="left">{CostOfAssistance}</TableCell>
                <TableCell style={style9}></TableCell>
                {showExportButton && (
                  <TableCell style={style10} align="center"><button className="px-3 bg-green-500 rounded-md" onClick={exportToExcel}>Export Data</button></TableCell>
                )}
                {!showExportButton && (
                <TableCell style={style10}></TableCell>
                )}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
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
          align={'left'}
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


export default Data_Table;


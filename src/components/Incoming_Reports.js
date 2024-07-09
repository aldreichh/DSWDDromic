import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TableVirtuoso } from 'react-virtuoso';
import { incoming_sample }from '../sampledata/sampleincomingdata';

function createData(id, disaster, province, municipality, city, affectedfamily, displacedfamily, damagedhouses, costofassistance, typeofreport, date) {
    return { id, disaster, province, municipality, city, affectedfamily, displacedfamily, damagedhouses, costofassistance, typeofreport, date };
  }
  
  const columns = [
    {
      width: 112,
      label: 'Disaster',
      dataKey: 'disaster',
    },
    {
      width: 112,
      label: 'Province',
      dataKey: 'province',
    },
    {
      width: 112,
      label: 'Municipality',
      dataKey: 'municipality',
    },
    {
      width: 112,
      label: 'City',
      dataKey: 'city',
    },
    {
      width: 112,
      label: 'Affected\u00A0Families',
      dataKey: 'affectedfamily',
      numeric: true,
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
      width: 112,
      label: 'Date',
      dataKey: 'date',
    },
    {
      width: 200,
      label: 'Actions',
      dataKey: 'actions',
      actionsColumn: true,
    },
];

const rows = incoming_sample.map((data, index) => {
    const [disaster, province, municipality, city, affectedfamily, displacedfamily, damagedhouses, costofassistance, typeofreport, date] = data;
    return createData(index, disaster, province, municipality, city, affectedfamily, displacedfamily, damagedhouses, costofassistance, typeofreport, date);
});


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
      {columns.map((column) => (
        <TableCell
            className="overflow-hidden"
            key={column.dataKey}
            variant="head"
            align={'center'}
            style={{ width: column.width }}
            sx={{
                backgroundColor: '#0284c7',
                color: 'white'
            }}
        >
            {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
    function handleApprove(rowId) {
        // Handle confirm logic for the row with id `rowId`
        console.log('Confirmed for row ID:', rowId);
    }
    
    function handleDeny(rowId) {
        // Handle deny logic for the row with id `rowId`
        console.log('Denied for row ID:', rowId);
    }

  return (
    <React.Fragment>
      {columns.map((column, columnIndex) => (
        <TableCell key={column.dataKey} align={columnIndex === 0 ? 'left' : 'center'} >
          {column.actionsColumn ? (
            <div className="flex justify-center">
                <div className="bg-green-500 shadow-sm rounded-md w-24 mr-1">
                    <Button 
                        className="w-full"  
                        sx={{color: 'white',
                            '&:hover': {
                            backgroundColor: '#16a34a',
                            boxShadow: 'none', 
                        }, }} 
                        variant="text" 
                        color="primary" 
                        onClick={() => handleApprove(row.id)}>
                        Approve
                    </Button>
                </div>
                <div className="bg-red-400 shadow-sm rounded-md w-24 ml-1">
                    <Button 
                        className="w-full"
                        sx={{color: 'white',
                            '&:hover': {
                            backgroundColor: '#ef4444',
                            boxShadow: 'none', 
                        }, }} 
                        variant="text" 
                        color="secondary" 
                        onClick={() => handleDeny(row.id)}>
                        Deny
                    </Button>
                </div>
            </div>
          ) : (
            column.format ? column.format(row[column.dataKey]) : row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
    return (
        <Paper style={{ height: '85vh', width: '100%' }}>
        <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
        />
        </Paper>
    );
}
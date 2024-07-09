import Button from '@mui/material/Button';
import React from 'react';

function Sort_By({ sortOrder, setSortOrder, timeFrame, setTimeFrame, onSortChange }) {
    const handleSortOrderClick = (value) => {
      setSortOrder(value);
      onSortChange(value, timeFrame); 
    };
  
    const handleTimeFrameClick = (value) => {
      if (timeFrame === value) {
        setTimeFrame('noSemSort');
      } else {
        setTimeFrame(value);
      }
      onSortChange(sortOrder, value);
    };
    
    return (
    <>
        <div className="text-white flex items-center">
            <p className="pl-3 pr-2 md:pr-5 md:mr-0 md:w-auto w-1/6">Sort by</p>
            <Button
            sx={{
                backgroundColor: sortOrder === 'latest' ? '#0c4a6e' : '#cbd5e1',
                color: sortOrder === 'latest' ? 'white' : '#0c4a6e',
                boxShadow: 'none',
                height: '30px',
                width: '100px',
                marginRight: '10px',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#0c4a6e',
                    color: 'white',
                    boxShadow: 'none', 
                },
            }}
            variant="contained"
            onClick={() => handleSortOrderClick('latest')}
            >
            Latest
            </Button>
            <Button
            sx={{
                backgroundColor: sortOrder === 'oldest' ? '#0c4a6e' : '#cbd5e1',
                color: sortOrder === 'oldest' ? 'white' : '#0c4a6e',
                boxShadow: 'none',
                height: '30px',
                width: '100px',
                marginRight: '10px',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#0c4a6e',
                    color: 'white',
                    boxShadow: 'none', 
                },
            }}
            variant="contained"
            onClick={() => handleSortOrderClick('oldest')}
            >
            Oldest
            </Button>
            <Button
            className="w-36"
            sx={{
                backgroundColor: timeFrame === 'firstSem' ? '#0c4a6e' : '#cbd5e1',
                color: timeFrame === 'firstSem' ? 'white' : '#0c4a6e',
                boxShadow: 'none',
                height: '30px',
                marginRight: '10px',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#0c4a6e',
                    color: 'white',
                    boxShadow: 'none', 
                },
            }}
            variant="contained"
            onClick={() => handleTimeFrameClick('firstSem')}
            >
            First Semester
            </Button>
            <Button
            className="w-44"
            sx={{
                backgroundColor: timeFrame === 'secondSem' ? '#0c4a6e' : '#cbd5e1',
                color: timeFrame === 'secondSem' ? 'white' : '#0c4a6e',
                boxShadow: 'none',
                height: '30px',
                marginRight: '10px',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#0c4a6e',
                    color: 'white',
                    boxShadow: 'none', 
                },
            }}
            variant="contained"
            onClick={() => handleTimeFrameClick('secondSem')}
            >
            Second Semester
            </Button>
        </div>
    </>
  );
}

export default Sort_By;

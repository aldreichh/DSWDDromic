import React, { useState, useEffect } from 'react';

function Date_Time() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const formattedDate = currentDateTime.toLocaleDateString(undefined, dateOptions);
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, timeOptions);

  const customFontSizeStyle = {
    fontSize: '3.5vw',
    fontWeight: 'bold',
  };


  return (
    <div style={customFontSizeStyle} className="flex flex-col justify-center items-center h-full overflow-hidden text-slate-600">
      <p >{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
}

export default Date_Time;

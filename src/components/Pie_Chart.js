import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';

function PieChartComponent({ disasterCategories, reports }) {
  console.log(disasterCategories)
  console.log(reports)
  const calculateSums = () => {
    const sums = {};

    reports.forEach((entry) => {
      const disasterID = entry.disasterID;
      if (!sums[disasterID]) {
        sums[disasterID] = {
          totalAffectedFamilies: 0,
          totalDisplacedHouses: 0,
          damagedHousesPartially: 0,  
          damagedHousesTotally: 0, 
        };
      }

      sums[disasterID].totalAffectedFamilies += entry.totalServedNumber || 0;
      sums[disasterID].totalDisplacedHouses += entry.displacedFamiliesTotal || 0;
      sums[disasterID].damagedHousesPartially += entry.damagedHousesPartially || 0;
      sums[disasterID].damagedHousesTotally += entry.damagedHousesTotally || 0;
    });

    Object.values(sums).forEach((sum) => {
      sum.totalAffectedFamilies = sum.totalAffectedFamilies || 0;
      sum.totalDisplacedHouses = sum.totalDisplacedHouses || 0;
      sum.damagedHousesPartially = sum.damagedHousesPartially || 0;
      sum.damagedHousesTotally = sum.damagedHousesTotally || 0;
    });

    return sums;
  };

  const sums = calculateSums();

  const chartData = [
    'totalAffectedFamilies', 
    'totalDisplacedHouses', 
    'damagedHousesPartially', 
    'damagedHousesTotally', 
    ].map(
    (property, index) => {
      return {
        property,
        data: Object.keys(sums)
          .map((disasterID) => {
            const category =
              disasterCategories.find((category) => category.id === parseInt(disasterID)) || {
                label: 'Unknown Category',
                color: '#999999',
              };

            const label = category.disasterName;
            const color = category.color;
            const value = sums[disasterID][property] || 0;

            return {
              id: parseInt(disasterID),
              value,
              color,
              label,
            };
          })
          .filter(Boolean)
          .sort((a, b) => b.value - a.value),
      };
    }
  );

  return (
    <>
      <div className="w-full h-full flex items-center md:justify-center ">
        {chartData.map((chart, index) => (
          <div key={index} style={{ height: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Typography className="justify-center items-center flex " style={{ fontSize: '1.10rem' }}>
              {chart.property === 'totalAffectedFamilies'
                ? 'Affected Families'
                : chart.property === 'totalDisplacedHouses'
                ? 'Displaced Families'
                : chart.property === 'damagedHousesPartially'
                ? 'Damaged Houses (Partially)'
                : 'Damaged Houses (Totally)'}
            </Typography>
            <Typography className="justify-center items-center flex " fontWeight="bold" style={{ fontSize: '1.25rem' }}>
              {chart.data.reduce((acc, cur) => acc + cur.value, 0).toLocaleString()}
            </Typography>
            <PieChart
              key={`${chart.property}-${index}`}
              series={[{ data: chart.data }]}
              margin={{ right: 5 }}
              legend={{ hidden: true }}
              animate={false}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PieChartComponent;
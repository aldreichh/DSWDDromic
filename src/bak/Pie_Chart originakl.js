import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { sample }from '../sampledata/sampledata';

const pieParams = { height: 200, margin: { right: 5 } };

const affectedFamilies = [
    { id: 'Agricultural Disease', value: 0, color: "#1e293b"},
    { id: 'Armed Conflict', value: 0, color: "#0c4a6e" },
    { id: 'Deforestation', value: 0, color: "#a5b4fc" },
    { id: 'Drought', value: 0, color: "#fde047" },
    { id: 'Dry Spell', value: 0, color: "#d8b4fe" },
    { id: 'Earthquake', value: 0, color: "#93c5fd" },
    { id: 'Fire Incident', value: 0, color: "#fdba74" },
    { id: 'Flash Flood', value: 0, color: "#67e8f9" },
    { id: 'Flood', value: 0, color: "#115e59" },
    { id: 'Heavy Rains', value: 0, color: "#fef9c3" },
    { id: 'Industrial Accident', value: 0, color: "#16a34a" },
    { id: 'Landslide', value: 0, color: "#64748b" },
    { id: 'Mudslide', value: 0, color: "#d6d3d1" },
    { id: 'Outbreak', value: 0, color: "#86efac" },
    { id: 'Pandemic', value: 0, color: "#f59e0b" },
    { id: 'Terrorism', value: 0, color: "#ef4444" },
    { id: 'Volcanic Eruption', value: 0, color: "#b91c1c" },
    { id: 'War', value: 0, color: "#bef264" },
    { id: 'Wildfire', value: 0, color: "#fda4af" },
];

const displacedFamilies = [
    { id: 'Agricultural Disease', value: 0, color: "#1e293b" },
    { id: 'Armed Conflict', value: 0, color: "#0c4a6e" },
    { id: 'Deforestation', value: 0, color: "#a5b4fc" },
    { id: 'Drought', value: 0, color: "#fde047" },
    { id: 'Dry Spell', value: 0, color: "#d8b4fe" },
    { id: 'Earthquake', value: 0, color: "#93c5fd" },
    { id: 'Fire Incident', value: 0, color: "#fdba74" },
    { id: 'Flash Flood', value: 0, color: "#67e8f9" },
    { id: 'Flood', value: 0, color: "#115e59" },
    { id: 'Heavy Rains', value: 0, color: "#fef9c3" },
    { id: 'Industrial Accident', value: 0, color: "#16a34a" },
    { id: 'Landslide', value: 0, color: "#64748b" },
    { id: 'Mudslide', value: 0, color: "#d6d3d1" },
    { id: 'Outbreak', value: 0, color: "#86efac" },
    { id: 'Pandemic', value: 0, color: "#f59e0b" },
    { id: 'Terrorism', value: 0, color: "#ef4444" },
    { id: 'Volcanic Eruption', value: 0, color: "#b91c1c" },
    { id: 'War', value: 0, color: "#bef264" },
    { id: 'Wildfire', value: 0, color: "#fda4af" },
];


const damagedHouses = [
    { id: 'Agricultural Disease', value: 0, color: "#1e293b" },
    { id: 'Armed Conflict', value: 0, color: "#0c4a6e" },
    { id: 'Deforestation', value: 0, color: "#a5b4fc" },
    { id: 'Drought', value: 0, color: "#fde047" },
    { id: 'Dry Spell', value: 0, color: "#d8b4fe" },
    { id: 'Earthquake', value: 0, color: "#93c5fd" },
    { id: 'Fire Incident', value: 0, color: "#fdba74" },
    { id: 'Flash Flood', value: 0, color: "#67e8f9" },
    { id: 'Flood', value: 0, color: "#115e59" },
    { id: 'Heavy Rains', value: 0, color: "#fef9c3" },
    { id: 'Industrial Accident', value: 0, color: "#16a34a" },
    { id: 'Landslide', value: 0, color: "#64748b" },
    { id: 'Mudslide', value: 0, color: "#d6d3d1" },
    { id: 'Outbreak', value: 0, color: "#86efac" },
    { id: 'Pandemic', value: 0, color: "#f59e0b" },
    { id: 'Terrorism', value: 0, color: "#ef4444" },
    { id: 'Volcanic Eruption', value: 0, color: "#b91c1c" },
    { id: 'War', value: 0, color: "#bef264" },
    { id: 'Wildfire', value: 0, color: "#fda4af" },
];

sample.forEach(entry => {
    const [disaster, affected, displaced, damaged] = entry;
    const affectedFamily = affectedFamilies.find(item => item.id === disaster);
    const displacedFamily = displacedFamilies.find(item => item.id === disaster);
    const damagedHouse = damagedHouses.find(item => item.id === disaster);
  
    if (affectedFamily) {
      affectedFamily.value += affected;
    }
  
    if (displacedFamily) {
      displacedFamily.value += displaced;
    }

    if (damagedHouse) {
        damagedHouse.value += damaged;
      }
    
  });
  
  affectedFamilies.sort((a, b) => b.value - a.value);
  displacedFamilies.sort((a, b) => b.value - a.value);
  damagedHouses.sort((a, b) => b.value - a.value);


function calculateTotal(data) {
    return data.reduce((sum, item) => sum + item.value, 0);
}

function Pie_Chart() {
    const totalAffectedFamilies = calculateTotal(affectedFamilies).toLocaleString();
    const totalDisplacedFamilies = calculateTotal(displacedFamilies).toLocaleString();
    const totalDamagedHouses = calculateTotal(damagedHouses).toLocaleString();
    
    return (
    <Grid container spacing={0} className="">
        <Grid item xs={12} md={6} lg={4}>
            <Box flexGrow={1}>
                <Typography className="justify-center items-center flex">Affected Families</Typography>
                <Typography className="justify-center items-center flex" fontWeight="bold"> {totalAffectedFamilies} </Typography>
                <PieChart
                    series={[
                    {
                        data: affectedFamilies,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                    ]}
                    {...pieParams}
                />
            </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <Box flexGrow={1}>
                <Typography className="justify-center items-center flex">Displaced Families</Typography>
                <Typography className="justify-center items-center flex" fontWeight="bold"> {totalDisplacedFamilies} </Typography>
                <PieChart
                    series={[
                    {
                        data: displacedFamilies,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                    ]}
                    {...pieParams}
                />
            </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <Box flexGrow={1}>
                <Typography className="justify-center items-center flex">Damaged Houses</Typography>
                <Typography className="justify-center items-center flex" fontWeight="bold"> {totalDamagedHouses} </Typography>
                <PieChart
                    series={[
                    {
                        data: damagedHouses,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                    ]}
                    {...pieParams}
                />
            </Box>
        </Grid>
    </Grid>
  );
}

export default Pie_Chart;

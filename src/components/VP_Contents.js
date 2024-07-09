import React, { useState, useEffect, useCallback} from 'react';
import DataTable from './Data_Table';
import DateTime from './Date_Time';
import Pie_Chart from './Pie_Chart';
import Chart_Legend from './Chart_Legend';
import dayjs from 'dayjs';

function VP_Contents ({provinceIndex, citiesIndex, barangayIndex, reports, disasters, showExportButton}) {
    const [sortOrder, setSortOrder] = useState('latest');
    const [timeFrame, setTimeFrame] = useState('noSemSort');
    const [currentYear, setCurrentYear] = useState(dayjs().format('YYYY'));
    const [disasterCategories, setDisasterCategories] = useState([]);
    const [categoryColors, setCategoryColors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        disasterFilter: [],
        provinceFilter: [],
        municipalityFilter: [],
        barangayFilter: [],
        selectedDate1: null,
        selectedDate2: null,
        typeofReport: '',
    });

    const getRandomColor = useCallback((categoryId) => {
        if (categoryColors[categoryId]) {
          return categoryColors[categoryId];
        } else {
           const limitedColors = [
              '#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#A1FF33',
              '#33A1FF', '#FF3333', '#33FFA1', '#A133FF', '#FFA133',
              '#A1FF33', '#33A133', '#33A1FF', '#A1FF33', '#33A133',
              '#3393FF', '#FF9333', '#FF33C1', '#C1FF33', '#33C1FF',
              '#FF33C1', '#C1FF33', '#33C1FF', '#FF33C1', '#C1FF33',
              '#FFC133', '#33FFC1', '#C133FF', '#FFC133', '#33C1FF',
              '#C133FF', '#FFC133', '#33C1FF', '#C133FF', '#FFC133',
              '#33FFC1', '#C133FF', '#FFC133', '#33C1FF', '#C133FF',
              '#FFC133', '#33C1FF', '#C133FF', '#FFC133', '#33C1FF',
              '#C133FF', '#FFC133', '#33C1FF', '#C133FF', '#FFC133',
            ];
    
          const randomIndex = Math.floor(Math.random() * limitedColors.length);
          const color = limitedColors[randomIndex];
    
          setCategoryColors((prevColors) => ({ ...prevColors, [categoryId]: color }));
          return color;
        }
    }, [categoryColors]);
    
    useEffect(() => {
        const categoriesWithRandomColors = disasters.map((category) => ({
          ...category,
          color: getRandomColor(category.id),
        }));
        setIsLoading(false);
        setDisasterCategories(categoriesWithRandomColors);
    }, [disasters, getRandomColor]);
    
    const customHeightStyle7 = {
        height: '87%',
    }

    const customHeightStyle8 = {
        width: '40%',
    }

    const customWidthStyle9 = {
        width: '60%',
    }

    return (
    <>
        <div className="w-full h-full -mt-14 md:-mt-16 pt-20 pl-4 pr-4 pb-4 flex justify-center items-center">
            <div className="w-full h-full justify-center flex-col ">
                <div className="w-full block h-4/6 md:h-1/3 -mb-16 md:mb-0 md:flex">
                    <div className="w-full h-3/6 md:h-full md:w-3/5 md:mr-4 bg-white shadow-md overflow-hidden">
                        <p className="bg-red-400 items-center flex pl-3 text-white h-10">{currentYear} Disaster Incidents</p>
                        <div style={customHeightStyle7} className=" flex justify-center items-center ">
                            <div style={customHeightStyle8} className="h-full flex-col overflow-auto">
                                <Chart_Legend   data={disasterCategories.map(category => category.disasterName)}
                                                colors={disasterCategories.map(category => category.color)} />
                            </div>
                            <div style={customWidthStyle9} className="h-full flex justify-center items-center overflow-y-auto">
                                {isLoading ? (
                                    <div className="h-full pt-5 bg-white">
                                        <h3>Loading data...</h3>
                                    </div>
                                ) : (
                                    reports.length > 0 && disasterCategories.length > 0 && (
                                        <Pie_Chart 
                                            disasterCategories={disasterCategories}
                                            reports={reports}/>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-2/6 md:h-full md:w-2/5 mt-4 md:mt-0 bg-white shadow-md overflow-hidden">
                        <p className="bg-red-400 items-center flex pl-3 text-white h-10">Data as of</p>
                        <div style={customHeightStyle7} className="">
                            <DateTime/>
                        </div>                       
                    </div>
                </div>
                <div className=" w-full block h-4/6 md:h-2/3 md:flex md:mt-4 pb-4">
                    <div className="flex flex-col w-full h-full md:h-full md:w-full mt-4 md:mt-0">
                        <div className="h-full overflow-y-hidden shadow-md w-full">
                            {isLoading ? (
                                <div className="h-full pt-5 bg-white">
                                    <h3>Loading data...</h3>
                                </div>
                            ) : (
                                <DataTable 
                                    showExportButton={showExportButton}
                                    sortOrder={sortOrder} 
                                    timeFrame={timeFrame} 
                                    disasterFilter={filters.disasterFilter}
                                    provinceFilter={filters.provinceFilter}
                                    municipalityFilter={filters.municipalityFilter}
                                    barangayFilter={filters.barangayFilter}
                                    selectedDate1={filters.selectedDate1}
                                    selectedDate2={filters.selectedDate2}
                                    typeofReport={filters.typeofReport}
                                    citiesIndex={citiesIndex} provinceIndex={provinceIndex} 
                                    barangayIndex={barangayIndex} disasters={disasters}
                                />
                            )}
                        </div>                       
                    </div>
                </div>    
            </div>        
        </div>
    </>
    )
}

export default VP_Contents;
import React, { useState, useEffect, useCallback  } from 'react';
import DataTable from './Data_Table';
import DateTime from './Date_Time';
import Filter_By from './Filter_By';
import Sort_By from './Sort_By';
import Pie_Chart from './Pie_Chart';
import Chart_Legend from './Chart_Legend';
import dayjs from 'dayjs';

function DV_Contents({provinceIndex, citiesIndex, barangayIndex, reports, disasters, showExportButton}) {
   const [sortOrder, setSortOrder] = useState('latest');
   const [timeFrame, setTimeFrame] = useState('noSemSort');
   const [currentYear, setCurrentYear] = useState(dayjs().format('YYYY'));
   const [disasterCategories, setDisasterCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [categoryColors, setCategoryColors] = useState(() => ({}));
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
  
   const onFilterChange = useCallback((newFilters) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
   }, []);

   const customHeightStyle2 = {
      height: '92%',
      width: '90%',
   };

   const customHeightStyle3 = {
      height: '92%',
   };

   const customHeightStyle7 = {
      height: '88%',
   };

   const customHeightStyle8 = {
      width: '40%',
   };

   const customWidthStyle9 = {
      width: '70%',
   };

   const onSortChange = (sortOrder, timeFrame) => {};

   return (
    <>
       <div className="w-full h-full -mt-14 md:-mt-16 pt-20 pl-4 pr-4 pb-4 flex justify-center items-center">
          <div className="w-full h-full justify-center flex-col ">
             <div className="w-full block h-4/6 md:h-1/3 -mb-16 md:mb-0 md:flex">
                <div className="w-full h-3/6 md:h-full md:w-2/3 md:mr-4 bg-white shadow-md overflow-hidden ">
                   <p className="bg-red-400 items-center flex pl-3 text-white h-10">{currentYear} Disaster Incidents</p>
                   <div style={customHeightStyle7} className=" flex justify-center items-center">
                      <div style={customHeightStyle8} className="h-full flex-col overflow-auto">
                         {disasterCategories.length > 0 && (
                            <Chart_Legend
                               data={disasterCategories.map(category => category.disasterName)}
                               colors={disasterCategories.map(category => category.color)}
                            />
                         )}
                      </div>
                      <div style={customWidthStyle9} className=" h-full flex justify-center items-center overflow-y-auto">
                        {isLoading ? (
                           <div className="h-full pt-5 bg-white">
                              <h3>Loading data...</h3>
                           </div>
                        ) : (
                           reports.length > 0 && disasterCategories.length > 0 && (
                              <Pie_Chart disasterCategories={disasterCategories} reports={reports} />
                           )
                        )}
                     </div>
                   </div>
                </div>
                <div className="w-full h-2/6 md:h-full md:w-1/3 mt-4 md:mt-0 bg-white shadow-md overflow-hidden ">
                   <p className="bg-red-400 items-center flex pl-3 text-white h-10">Data as of</p>
                   <div style={customHeightStyle7} className="">
                      <DateTime />
                   </div>
                </div>
             </div>
             <div className=" w-full block h-4/6 md:h-2/3 md:flex md:mt-4 pb-4">
                <div className="w-full h-full md:h-full md:w-1/5 md:mr-4 bg-white shadow-md ">
                   <div className="h-10 bg-sky-600 flex items-center text-white pl-3">
                      <p>Filter by</p>
                   </div>
                   <div className="flex justify-center overflow-y-auto" style={customHeightStyle3}>
                      <div style={customHeightStyle2}>
                         <Filter_By onFilterChange={onFilterChange} 
                                    citiesIndex={citiesIndex} provinceIndex={provinceIndex} 
                                    barangayIndex={barangayIndex} disasters={disasters} />
                      </div>
                   </div>
                </div>
                <div className="flex flex-col w-full h-full md:h-full md:w-4/5 mt-4 md:mt-0">
                   <div className="block md:flex h-16 md:h-10">
                      <div className="bg-sky-600 w-full md:w-full h-full md:h-full flex items-center shadow-md overflow-x-auto">
                         <Sort_By
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            timeFrame={timeFrame}
                            setTimeFrame={setTimeFrame}
                            onSortChange={onSortChange}
                         />
                      </div>
                   </div>
                   <div className="h-full mt-4 overflow-y-hidden shadow-md">
                      <DataTable
                           showExportButton={showExportButton}
                           reports={reports}
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
                   </div>
                </div>
             </div>
          </div>
       </div>
    </>
 );
}

export default DV_Contents;
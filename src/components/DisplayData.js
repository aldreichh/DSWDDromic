import React from 'react';

const DisplayData = ({ createdData }) => {
  // Create a dictionary to group reports by municipality
  const reportsByMunicipality = createdData.reduce((acc, report) => {
    const municipalityID = report.cities; // Assuming 'cities' represents the municipality ID

    // Check if the municipality is already in the dictionary
    if (!acc[municipalityID]) {
      acc[municipalityID] = [];
    }

    // Add the report to the corresponding municipality
    acc[municipalityID].push(report);

    return acc;
  }, {});
  
  return (
    <div className="h-full mx-1">
      {Object.entries(reportsByMunicipality).map(([municipalityID, reports]) => (
        <div key={municipalityID} className="mb-4 ">
          <div className="flex justify-center">           
            <p className="text-xl bg-sky-600 flex text-white justify-center w-1/2 rounded-md py-1 mb-2">Municipality: {municipalityID}</p>
          </div>
          {reports.map((report, index) => (
            <div key={index}>
                {report.barangay && <p className="text-lg">Barangay: {report.barangay}</p>}
                {report.displacedFamiliesInsideEC && <p className="text-lg">Displaced Families Inside EC: {report.displacedFamiliesInsideEC}</p>}
                {report.displacedFamiliesOutsideEC && <p className="text-lg">Displaced Families Outside EC: {report.displacedFamiliesOutsideEC}</p>}
                {report.totalServedNumberFamilies && <p className="text-lg">Total Served Number Families: {report.totalServedNumberFamilies}</p>}
                {report.totalServedNumberPersons && <p className="text-lg">Total Served Number Persons: {report.totalServedNumberPersons}</p>}
                {report.damagedHousesTotally && <p className="text-lg">Damaged House Totally: {report.damagedHousesTotally}</p>}
                {report.damagedHousesPartially && <p className="text-lg">Damaged House Partially: {report.damagedHousesPartially}</p>}
                {report.costOfAssistanceDSWD && <p className="text-lg">Cost of Assistance (DSWD): {report.costOfAssistanceDSWD}</p>}
                {report.costOfAssistanceLGUAffected && <p className="text-lg">Cost of Assistance (LGU Affected): {report.costOfAssistanceLGUAffected}</p>}
                {report.costOfAssistanceLGUDonor && <p className="text-lg">Cost of Assistance (LGU Donor): {report.costOfAssistanceLGUDonor}</p>}
                {report.costOfAssistanceNGO && <p className="text-lg">Cost of Assistance (NGO): {report.costOfAssistanceNGO}</p>}
                <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DisplayData;

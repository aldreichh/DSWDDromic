import React from 'react';

const Column = ({ items, colors }) => (
  <>
    <div className="w-full pl-4 pt-4 xl:pb-4 xl:w-1/3 mx-1 text-lg">
      {items.map((item, index) => (
        <div key={index} className="mb-2 flex items-center">
          <div
            className={`w-2 h-4 mr-2 rounded-2xl`}
            style={{ backgroundColor: colors[index] || '#000000' }} // Use a default color if colors[index] is undefined
          ></div>
          <div className="w-full">{item}</div>
        </div>
      ))}
    </div>
  </>
);

function Chart_Legend({ data, colors }) {
  const columns = Array.from({ length: Math.ceil(data.length / 8) }, (_, i) =>
    data.slice(i * 8, i * 8 + 8)
  );

  const colorColumns = Array.from({ length: Math.ceil(colors.length / 8) }, (_, i) =>
    colors.slice(i * 8, i * 8 + 8)
  );

  return (
    <div className="flex flex-col xl:flex-row text-xs h-full">
      {columns.map((column, columnIndex) => (
        <Column key={columnIndex} items={column} colors={colorColumns[columnIndex] || []} />
      ))}
    </div>
  );
}


export default Chart_Legend;

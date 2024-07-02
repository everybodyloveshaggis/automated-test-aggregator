

"use client"
import React, { useEffect, useState } from 'react';

export default function Home() {
const rowHeaders = ['UAT', 'OAT', 'PRE', 'PRD'];
const columnHeaders = [
  '', 'RP&S', 'LPIS', 'LIS', 'AGS',
  'HMU', 'Apply', 'Claim', 'Pay', 'Debts'
];

  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results: string[][] = [];

      for (let row of rowHeaders) {
        const rowData: string[] = [];
        for (let col of columnHeaders) {
          try {
            const response = await fetch(`http://localhost:8080/api/getTest?env=${row}&app=${col}`);
            const result = await response.json();
            rowData.push(result.data); // Assuming API returns { data: "PASS" or "FAIL" }
          } catch (error) {
            console.error(`Failed to fetch data for env=${row} app=${col}`, error);
            rowData.push('Error');
          }
        }
        results.push(rowData);
      }

      setData(results);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl mb-8">ARE Automated Test Dashboard</h1>
      <div className="grid grid-cols-11 gap-4 w-full max-w-screen-lg">
        {/* Empty cell in top-left corner */}
        <div></div>
        {/* Column Headers */}
        {columnHeaders.map((header, index) => (
          <div key={index} className="bg-gray-700 p-4 border border-gray-600 text-center">{header}</div>
        ))}

        {/* Row Headers and Content */}
        {rowHeaders.map((rowName, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="bg-gray-700 p-4 border border-gray-600">{rowName}</div>
            {columnHeaders.map((_, colIndex) => (
              <div 
                key={colIndex} 
                className={`p-4 border border-gray-500 text-center ${
                  data[rowIndex]?.[colIndex] === 'PASS' 
                    ? 'bg-green-500' 
                    : data[rowIndex]?.[colIndex] === 'FAIL' 
                    ? 'bg-red-500' 
                    : 'bg-gray-600'
                }`}
              >
                {data[rowIndex]?.[colIndex] || 'Loading...'}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
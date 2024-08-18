"use client"
import React from 'react';

function MyGrid() {
  const envs = [ "PROD", "PREPROD", "OAT", "UAT"];
  const apps = ["ENV","app_name1", "app_name2"];


  const getApiData = (appName: string, environment:string) => {
    return `Data for ${appName} in ${environment}`; 
  };

  return (
    <table>
      <thead>
        <tr>
          {apps.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {envs.map((environment, rowIndex) => (
          <tr key={rowIndex}>
            <td>{environment}</td> 
            {apps.slice(1).map((appName, colIndex) => ( 
              <td key={colIndex}>
                {getApiData(appName, environment)} 0
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyGrid;
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Graphs() {
  const location = useLocation();
  const selectedProject = location.state ? location.state.selectedProject : null;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/getdata')
      .then(response => response.json())
      .then(data => {
        if (data.Status === "Success") {
          setData(data.Result);
          console.log(data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredData = selectedProject
    ? data.filter(item => item.project_name === selectedProject)
    : data;

  const chartData = {
    labels: filteredData.map(item => {
      const date = new Date(item.date).toLocaleDateString(); // Convert to local date string
      return `${date} - ${item.employeename}`;
    }),
    datasets: [
      {
        label: 'Total Duration (minutes)',
        data: filteredData.map(item => item.total_duration),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 500,
        ticks: {
          stepSize: 50,
        },
        title: {
          display: true,
          text: 'Total Duration (minutes)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date - Employee Name',
        },
      },
    },
  };

  return (
    <div>
      {selectedProject && (
        <div>
          <h2>Project: {selectedProject}</h2>
          <Bar data={chartData} options={options} />
        </div>
      )}
      {!selectedProject && (
        <div>
          <h2>All Projects</h2>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

export default Graphs;

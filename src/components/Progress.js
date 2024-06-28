import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = () => {
    axios.get('http://localhost:3001/progress')
      .then(response => {
        setProgressData(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress data:', error);
      });
  };

  const renderCharts = () => {
    const groupedData = progressData.reduce((acc, item) => {
      if (!acc[item.id]) acc[item.id] = [];
      acc[item.id].push(item);
      return acc;
    }, {});

    return Object.keys(groupedData).map(id => {
      const data = groupedData[id];
      const chartData = {
        labels: data.map(item => item.topic_project),
        datasets: [
          {
            label: 'Total Hours',
            data: data.map(item => item.total_hours),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            yAxisID: 'y1',
          },
          {
            label: 'Total Minutes',
            data: data.map(item => item.total_minutes),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            yAxisID: 'y2',
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            labels: data.map(item => item.topic_project),
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y1: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            min: 0,
            max: 24,
            title: {
              display: true,
              text: 'Hours',
            },
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return `${value} hrs`;
              }
            }
          },
          y2: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            min: 0,
            max: 60,
            title: {
              display: true,
              text: 'Minutes',
            },
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return `${value} mins`;
              }
            },
            grid: {
              drawOnChartArea: false, // prevents the grid lines from being drawn on the chart area
            },
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Progress Dashboard for ID ${id}`,
          },
        },
      };

      return (
        <div className="chart" key={id}>
          <Bar data={chartData} options={options} />
        </div>
      );
    });
  };

  return (
    <div className="container">
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px;
        }

        .chart {
          width: 101%;
          height: 500px;  /* Adjusted height for larger display */
          margin-bottom: 50px;
        }
      `}</style>
      <h2>Progress Dashboard</h2>
      {renderCharts()}
    </div>
  );
};

export default Progress;
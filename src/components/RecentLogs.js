import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecentLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <section className="recent-logs">
      <h2>My Time logs</h2>
      <table>
        <thead>
          <tr>
            <th>ID </th>
            <th>Date</th>
            <th>Topic_Project</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.date}</td>
              <td>{log.topic_project}</td>
              <td>{log.start_time}</td>
              <td>{log.end_time}</td>
              <td>{log.total_duration}</td>
              <td>{log.description}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default RecentLogs;

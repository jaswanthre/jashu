import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
const MyWork = () => {
  const [workLogs, setWorkLogs] = useState([]);

  useEffect(() => {
    fetchWorkLogs();
  }, []);

  const fetchWorkLogs = () => {
    axios.get('http://localhost:5000/logs')
      .then(response => {
        setWorkLogs(response.data);
      })
      .catch(error => console.log(error));
  };

  const deleteLog = (id) => {
    axios.delete(`http://localhost:5000/logs/${id}`)
      .then(response => {
        alert(response.data.message);
        fetchWorkLogs(); // Fetch the updated work logs after deletion
      })
      .catch(error => console.log(error));
  };

  return (
    <div style={{paddingLeft:'250px',paddingRight:'50px'}}>
      <Sidebar/>
      <h2>My Time Logs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Topic/Project</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.date}</td>
              <td>{log.topic_project}</td>
              <td>{log.start_time}</td>
              <td>{log.end_time}</td>
              <td>{log.total_duration} Mins</td>
              <td>{log.description}</td>
              <td>
                <button onClick={() => deleteLog(log.entry_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWork;

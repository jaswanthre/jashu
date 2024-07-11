import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const ManageWorkProfile = () => {
  const [employeename, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [topic_project, setTopicProject] = useState('');
  const [total_duration, setStartTime] = useState('');
  
  const [description, setDescription] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getProject')
      .then((response) => {
        if (response.data.Status === "Success") {
          setProjects(response.data.Result);
        } else {
          console.error('Error fetching projects:', response.data.Error);
        }
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
      });
  }, []);

  const create = (e) => {
    e.preventDefault();
    const data = {employeename, date, topic_project, total_duration, description };
    console.log(data);
    axios.post('http://localhost:3001/create1', data)
      .then((response) => {
        setRegisterStatus(response.data.message);
        if (response.status === 200) {
          alert("Success");
         setEmployeeName('');
          setDate('');
          setTopicProject('');
          setStartTime('');
         
          setDescription('');
        }
      })
      .catch(err => {
        console.log(err);
        alert('ID is not matching to database');
      });
  };

  const inputStyle = {
    width: '350px',
    height: '40px',
    fontSize: '16px',
    margin: '10px 0',
  };

  const textareaStyle = {
    width: '350px',
    height: '100px',
    fontSize: '16px',
    margin: '10px 0',
  };

  const buttonStyle = {
    width: '350px',
    height: '40px',
    fontSize: '16px',
    margin: '10px 0',
  };

  return (
    <div style={{ paddingLeft: '250px', paddingRight: '1250px' }}>
      <Sidebar />
      <form onSubmit={create}>
      
        <input type="employeename" value={employeename} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Employeename" style={inputStyle} />
        <select value={topic_project} onChange={(e) => setTopicProject(e.target.value)} style={inputStyle}>
          <option value="">Select Project</option>
          {projects.map((projects) => (
            <option key={projects.project_id} value={projects.project_name}>{projects.project_name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={inputStyle} />
       
        <input type="number" value={total_duration} onChange={(e) => setStartTime(e.target.value)} placeholder="Total Duration" style={inputStyle} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={textareaStyle}></textarea>
        <button type="submit" style={buttonStyle}>Create</button>
      </form>
      {registerStatus && <p>{registerStatus}</p>}
    </div>
  );
};

export default ManageWorkProfile;

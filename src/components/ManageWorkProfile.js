import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const ManageWorkProfile = () => {
 const [id, setId] = useState('');
 const [date, setDate] = useState('');
 const [topic_project, setTopicProject] = useState('');
 const [start_time, setStartTime] = useState('');
 const [end_time, setEndTime] = useState('');
 const [description, setDescription] = useState('');
 const [registerStatus, setRegisterStatus] = useState('');

 const create = (e) => {
  e.preventDefault();
  const data={id, date, topic_project, start_time, end_time, description};
  console.log(data);
  axios.post('http://localhost:3001/create1', data

  ).then((response) => {
   setRegisterStatus(response.data.message);
   if (response.status === 201) {
    alert("Success");
    setId('');
    setDate('');
    setTopicProject('');
    setStartTime('');
    setEndTime('');
    setDescription('');
   }
  }).catch(err => {console.log(err);
    alert('ID is not matching to database+')
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
  <div style={{paddingLeft:'250px',paddingRight:'1250px'}}>
    
     <Sidebar/>
   <form onSubmit={create}>

    <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" style={inputStyle} />
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={inputStyle} />
    <input type="text" value={topic_project} onChange={(e) => setTopicProject(e.target.value)} placeholder="Topic/Project" style={inputStyle} />
    <input type="time" value={start_time} onChange={(e) => setStartTime(e.target.value)} placeholder="Start Time" style={inputStyle} />
    <input type="time" value={end_time} onChange={(e) => setEndTime(e.target.value)} placeholder="End Time" style={inputStyle} />
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={textareaStyle}></textarea>
    <button type="submit" style={buttonStyle}>Create</button>
   </form>
   {registerStatus && <p>{registerStatus}</p>}
  </div>
 );
};

export default ManageWorkProfile;

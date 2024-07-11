import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Progress() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const navigate = useNavigate();
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

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleGoClick = () => {
    if (selectedProject) {
      navigate("/graphs", {
        state: {selectedProject},
});
    } else {
      alert('Please select a project');
    }
  };

  return (
    <div>
      <h1>Select the Project</h1>
      <select value={selectedProject} onChange={handleProjectChange} style={{ width: '200px', height: '30px', fontSize: '16px' }}>
        <option value="">Select Project</option>
        {projects.map((project) => (
          <option key={project.project_id} value={project.project_name}>{project.project_name}</option>
        ))}
      </select>
      <button onClick={handleGoClick} style={{ marginLeft: '10px', height: '35px', fontSize: '16px' }}>Go</button>
    </div>
  );
}

export default Progress;

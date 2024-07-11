import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Project() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getProject')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteproject/${id}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setData(data.filter(project => project.project_id !== id));
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Project</h3>
      </div>
      <Link to="/createproject" className='btn btn-success'>Add Project</Link>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Project Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => (
              <tr key={index}>
                <td>{project.project_id}</td>
                <td>{project.project_name}</td>
                <td>
                  <button onClick={() => handleDelete(project.project_id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Project;

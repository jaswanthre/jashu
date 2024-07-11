import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProject() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const navigate = useNavigate();

    const create = (e) => {
        e.preventDefault();
        const data = {
            id: id,
            name: name,
        };
        console.log('Data being sent to server:', data);

        axios.post("http://localhost:3001/createproject", data)
            .then((response) => {
                console.log('Server response:', response);
                if (response.data.message) {
                    setRegisterStatus(response.data.message);
                } else {
                    alert("Success");
                    navigate('/project');
                }
            })
            .catch(err => {
                console.error('Error in Axios request:', err);
                setRegisterStatus('An error occurred while creating the project.');
            });
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Projects</h2>
            <form className="row g-3 w-50" onSubmit={create}>
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Project Id</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder='Enter Project Id' 
                        autoComplete='off'
                        onChange={(e) => setId(e.target.value)} 
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Project Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Enter Project Name' 
                        autoComplete='off'
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddProject;

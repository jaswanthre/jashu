import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
function AddEmployee() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [password, setpassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
     
    const navigate = useNavigate()
 
    const create = (e) => {
        e.preventDefault();
        const data={ id:id,
            name: name,
            email: email,
            address: address,
            password: password};
            console.log(data);
        axios.post("http://localhost:3001/create", 
data
        ).then((response) => {
          // setRegisterStatus(response);
          console.log(response);
          if(response.data.message){
            setRegisterStatus(response.data.message);
          }else{
            navigate('/employee')
            alert("Success");
          }
        })
        .catch(err => console.log(err));
    }
 
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Employee</h2>
            <form className="row g-3 w-50">
                <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Id</label>
                    <input type="number" className="form-control" placeholder='Enter Id' autoComplete='off'
                    onChange={(e) => {setId(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
                    onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Enter Email' autoComplete='off'
                    onChange={(e) => {setemail(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" placeholder="Enter Password" autoComplete='off'
                    onChange={(e) => {setpassword(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder="1234 Main St" autoComplete='off'
                    onChange={(e) => {setaddress(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={create}>Create</button>
                </div>
            </form>
        </div>
 
    )
}
 
export default AddEmployee
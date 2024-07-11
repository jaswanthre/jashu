import React, { useState } from "react";
import Axios from "axios";
import './SignUp.css';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/register", {
            email: email,
            name: name,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            }
        });
    };

    return (
        <div className="container">
            <div className="form-container">
                <form>
                    <div className="form-title">
                        Create Your Account
                    </div>
                    <p><h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1></p>
                    
                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            onChange={(e) => { setName(e.target.value) }} 
                            placeholder="Enter your Name" 
                            required
                        />
                        <label className="form-label">Name</label>
                    </div>
                    
                    <div className="form-outline mb-4">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            onChange={(e) => { setEmail(e.target.value) }} 
                            placeholder="Enter your Email Address" 
                            required
                        />
                        <label className="form-label">Email address</label>
                    </div>
                    
                    <div className="form-outline mb-3">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            onChange={(e) => { setPassword(e.target.value) }} 
                            placeholder="Enter your Password" 
                            required
                        />
                        <label className="form-label">Password</label>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check mb-0">
                            <input className="form-check-input me-2" type="checkbox" value=""/>
                            <label className="form-check-label">
                                Remember me
                            </label>
                        </div>
                        Forgot password?
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg" onClick={register}>Sign Up</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a href="login" className="link-danger">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

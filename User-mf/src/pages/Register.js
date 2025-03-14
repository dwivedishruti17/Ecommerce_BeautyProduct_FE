import React from "react";
import { useState, useEffect } from "react";
import { register } from "../api/UserApi";
import { Alert } from "react-bootstrap";

const Register = () =>{


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
     
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
     
      const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
      };
     
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
          const data = await register(formData);
          setSuccess("Registration successful!");
        } catch (err) {
          setError(err);
        }
      };
    return(
        <body class="bg-light d-flex align-items-center justify-content-center">
    <div class="card shadow-lg w-100" style={{maxWidth: '480px'}}>
        <div class="card-body">
            <div class="text-center">
                <h1 class="card-title h3">Sign in</h1>
                <p class="card-text text-muted">Sign in below to access your account</p>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
            </div>
            <div class="mt-4">
                <form action="" onSubmit={handleSubmit} >

                <div class="mb-4">
                        <label for="name" class="form-label text-muted">Full Name</label>
                        <input type="text"
                         class="form-control"
                         id="name"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                         required/>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label text-muted">Email Address</label>
                        <input type="email"
                         class="form-control"
                         id="email"
                         name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                         required/>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label text-muted">Password</label>
                        <input type="password"
                         class="form-control" 
                         id="password" 
                         name="password"
                         placeholder="Password"
                         value={formData.password}
                         onChange={handleChange}
                    
                          required/>
                    </div>
                    {/* <div class="mb-4">
                        <label for="password" class="form-label text-muted">Confirm Password</label>
                        <input type="password"
                         class="form-control" 
                         id="confirmpassword" 
                         placeholder="Confirm Password"
                    
                          required/>
                    </div> */}


                    <div class="d-grid">
                        <button type="submit" class="btn btn-custom btn-lg">Sign up</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
    </body>
    )
};
export default Register;
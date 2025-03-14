import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { fetchData, login } from '../api/UserApi';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Login  = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleNavigate = (path) => {
      console.log(`Navigating to ${path}`);
      navigate(path);
    };
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const data = await login(email, password);
        // Cookies.set('token', data.jwtToken, { expires: 1 });
        setSuccess('Login successful!');
        setError('');
        console.log(data); 
        document.cookie = `token=${data.jwtToken}; path=/; domain=localhost; SameSite=None; Secure`;
      } catch (err) {
        setError('Login failed. Please check your credentials.');
        setSuccess('');
      }
    };
  
    return(
        <body class="bg-light d-flex align-items-center justify-content-center">

{/* <div class="col-md-5 mb-0">
            <div class="card">
                <img src="https://images.unsplash.com/photo-1444881421460-d838c3b98f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHx3YXRjaHxlbnwwfDB8fHwxNzM0OTY1MTc4fDA&ixlib=rb-4.0.3&q=80&w=1080" class="card-img-top" alt="Product Image"/>
                {/* <img src={product.imageUrl} class="card-img-top"/> */}
              
            {/* </div> */}
        {/* </div>  */}
    <div class="card shadow-lg w-100" style={{maxWidth: '480px'}}>
        <div class="card-body">
            <div class="text-center">
                <h1 class="card-title h3">Sign in</h1>
                <p class="card-text text-muted">Sign in below to access your account</p>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
            </div>
            <div class="mt-4">
                <form action="" onSubmit={handleLogin}>
                    <div class="mb-4">
                        <label for="email" class="form-label text-muted">Email Address</label>
                        <input type="email"
                         class="form-control"
                         id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                         required/>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label text-muted">Password</label>
                        <input type="password"
                         class="form-control" 
                         id="password" 
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                          required/>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-custom btn-lg">Sign in</button>
                    </div>
                    <p class="text-center text-muted mt-4">Don't have an account yet?
                        <a onClick={()=>navigate("/register")} class="text-decoration-none">Sign up</a>.
                    </p>
                   
                </form>
            </div>
        </div>
    </div>
    </body>
    );
   
  
  
   
}

export default Login;
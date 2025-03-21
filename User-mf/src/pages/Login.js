import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { fetchData, login } from "../api/UserApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const[isvisible, setIsvisible] = useState(false);
  const handleVisible = () =>{
    setIsvisible(!isvisible);
  }
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const data = await login(email, password);
     
      setSuccess("Login successful!");
      navigate("/");
      setError("");
      console.log(data);
      document.cookie = `token=${data.jwtToken}; path=/; domain=localhost; SameSite=None; Secure`;
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setSuccess("");
    }
  };

  return (
    <div class="bg-light d-flex align-items-center justify-content-center" style={{backgroundImage:"url('https://i.pinimg.com/736x/1c/06/80/1c06808a5ce60abb1fddec46c6e4b75b.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "60vh", width: "100vw"}}>
      <div class="card shadow-lg w-100" style={{ maxWidth: "480px", height:"450px" }}>
        <div class="card-body">
          <div class="text-center">
            <h1 class="card-title h3">Sign in</h1>
            <p class="card-text text-muted">
              Sign in below to access your account
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
          </div>
          <div class="mt-4">
            <form action="" onSubmit={handleLogin}>
              <div class="mb-4">
                <label for="email" class="form-label text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{width:"425px"}}
                  
                />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label text-muted">
                  Password
                </label>
                <div className="d-flex align-items-center">
                <input
                  type={isvisible?"text":"password"}
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
             {isvisible?<FaRegEye size={20} style={{marginLeft:"4px"}} onClick={handleVisible} />:
             <FaRegEyeSlash size={20} style={{marginLeft:"4px"}} onClick={handleVisible} />}   
                 </div>
               
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-custom btn-lg">
                  Sign in
                </button>
              </div>
              <p class="text-center text-muted mt-4">
                Don't have an account yet?
                <a
                  onClick={() => navigate("/register")}
                  class="text-decoration-none"
                >
                  Sign up
                </a>
                
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { fetchData, login } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[isvisible, setIsvisible] = useState(false);
  const handleVisible = () =>{
    setIsvisible(!isvisible);
  }
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      toast.success("Login Successful!")
      navigate("/");
      console.log(data);
      const expires = new Date(Date.now() + 24 * 3600 * 1000).toUTCString();
      document.cookie = `token=${data.jwtToken}; path=/; domain=localhost; SameSite=None; Secure; expires=${expires}`;
    } catch (err) {
      toast.error("Login failed. Please check your credentials.")
     
    }
  };

  return (
    <div className="bg-light d-flex align-items-center justify-content-center bg-custom">
    <div className="card shadow-lg w-100 card-custom">
      <div className="card-body">
        <div className="text-center">
          <h1 className="card-title h3">Sign in</h1>
          <p className="card-text text-muted">
            Sign in below to access your account
          </p>
        </div>
        <div className="mt-4">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-muted">
                Email Address
              </label>
              <input
                type="email"
                className="form-control input-custom"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-muted">
                Password
              </label>
              <div className="d-flex align-items-center">
                <input
                  type={isvisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {isvisible ? (
                  <FaRegEye size={20} className="eye-icon" onClick={handleVisible} />
                ) : (
                  <FaRegEyeSlash size={20} className="eye-icon" onClick={handleVisible} />
                )}
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-custom btn-lg">
                Sign in
              </button>
            </div>
            <p className="text-center text-muted mt-4">
              Don't have an account yet?
              <a onClick={() => navigate("/register")} className="text-decoration-none">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer autoClose={2000} />
  </div>
  );
};

export default Login;

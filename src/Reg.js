
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './Reg.css'; 
import Login from './Login';

const Reg = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/insert', {
      un: username,
      pass: password,
    })
    .then((response) => {
      console.log('Registration successful:', response.data);
    })
    .catch((error) => {
      console.error('Registration failed:', error);
    });
  };

  return (
    <Router>
      <div className="registration-container">
        <h1 className="website-name">MENTOR SYNC</h1>
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
        <div>
          <p className="existing-student-link">
            Already a student? <NavLink to="/Login" activeClassName="active-link">Sign in here</NavLink>.
          </p>
          <Routes>
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Reg;

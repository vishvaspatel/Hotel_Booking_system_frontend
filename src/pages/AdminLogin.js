import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Hardcoded credentials
    const adminUsername = "admin@mydomain.com";
    const adminPassword = "123456";
    
    if (email === adminUsername && password === adminPassword) {
      // Successful login, redirect to Admin Dashboard
      navigate('/admin-dashboard');
    } else {
      // Invalid credentials
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-body">
      <div className="admin-login-container">
        <h1 className="admin-login-title">Hotel Booking System</h1>
        <h2 className="admin-login-subtitle">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Username: </label>
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Password: </label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">Login</button>
        </form>
        
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;

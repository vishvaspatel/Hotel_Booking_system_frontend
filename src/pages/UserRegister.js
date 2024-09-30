import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserRegister.css'; // Import CSS for styling

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New email state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hotel-booking-system-backend-xi.vercel.app/api/users/register', {
        username,
        password,
        email, // Include email in the request
      });

      alert(response.data.message);
      navigate('/user-login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="user-register-body">
      <div className="user-register-container">
        <h2 className="user-register-title">User Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default UserRegister;

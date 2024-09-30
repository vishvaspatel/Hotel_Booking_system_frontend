import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserLogin.css'; // Import CSS for styling

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hotel-booking-system-backend-xi.vercel.app/api/users/login', {
        username,
        password,
      });

      localStorage.setItem('username', username); // Store the username in local storage
      alert('Login successful!');
      navigate('/user-page'); // Redirect to user page after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/user-register'); // Navigate to the registration page
  };

  return (
    <div className="user-login-body">
      <div className="user-login-container">
        <h2 className="user-login-title">User Login</h2>
        <form onSubmit={handleLogin}>
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
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        
        {/* Registration Button */}
        <button className="button" onClick={handleRegisterRedirect}>User Registration</button>
      </div>
    </div>
  );
}

export default UserLogin;

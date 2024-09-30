// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddHotel from './pages/AddHotel'; // Import your AddHotel component
import UserLogin from './pages/UserLogin'; // Import User Login component
import UserRegister from './pages/UserRegister'; // Import User Registration component
import UserPage from './pages/UserPage'; // Import UserPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-hotel" element={<AddHotel />} />
        <Route path="/user-login" element={<UserLogin />} /> {/* User Login Route */}
        <Route path="/user-register" element={<UserRegister />} /> {/* User Registration Route */}
        <Route path="/user-page" element={<UserPage />} /> {/* Add route for UserPage */}
      </Routes>
    </Router>
  );
}

export default App;

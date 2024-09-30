import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddHotel.css'; // Import CSS for styling

function AddHotel() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rentPerNight, setRentPerNight] = useState('');
  const [address, setAddress] = useState('');
  const [ratings, setRatings] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = { 
      name, 
      city, 
      rentPerNight, 
      address, 
      ratings, 
      contactNumber 
    };

    try {
      // Make a POST request to the backend
      const response = await axios.post('https://hotel-booking-system-backend-xi.vercel.app/api/hotels', hotelData);
      console.log(response.data);

      // Show success alert
      alert('Hotel added successfully!');

      // Redirect to Admin Dashboard on success
      navigate('/admin-dashboard');
    } catch (error) {
      setError('Failed to add hotel');
    }
  };

  return (
    <div className="add-hotel-container">
      <h1>Add a New Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hotel Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rent Per Night: </label>
          <input
            type="number"
            value={rentPerNight}
            onChange={(e) => setRentPerNight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ratings: </label>
          <input
            type="number"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
            required
            min="1"
            max="5"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Contact Number: </label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='addhotel'>Add Hotel</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddHotel;

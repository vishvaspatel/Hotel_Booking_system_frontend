import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaSignOutAlt, FaMapMarkerAlt, FaDollarSign, FaHome, FaStar, FaPhoneAlt } from 'react-icons/fa'; // Import icons
import './AdminDashboard.css'; // Import CSS for styling

function AdminDashboard() {
  const [hotels, setHotels] = useState([]); // State to hold hotels data
  const [bookings, setBookings] = useState([]); // State to hold all bookings data
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin'); // Clear admin state
    alert('You have logged out successfully!');
    navigate('/'); // Redirect to home page
  };

  const handleAddHotel = () => {
    navigate('/add-hotel'); // Navigate to Add Hotel page
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://hotel-booking-system-backend-xi.vercel.app/api/hotels'); // Fetch hotels from API
      setHotels(response.data); // Update state with the fetched hotels
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://hotel-booking-system-backend-xi.vercel.app/api/bookings'); // Fetch all bookings from API
      setBookings(response.data); // Update state with the fetched bookings
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  useEffect(() => {
    fetchHotels(); // Fetch hotels when the component mounts
    fetchBookings(); // Fetch all bookings when the component mounts
  }, []);

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <h1 className="header-title">Admin Dashboard</h1>
        <div className="header-buttons">
          <button className="action-button" onClick={handleAddHotel}>Add Hotel
          </button>
          <button className="action-button" onClick={handleLogout}> Logout
          </button>
        </div>
      </header>

      <h2 className="section-title">List of Hotels</h2>
      {hotels.length > 0 ? (
        <ul className="hotel-list">
          {hotels.map((hotel) => (
            <li key={hotel._id} className="hotel-item">
              <strong>Hotel Name: {hotel.name}</strong> <br />
              <span className="highlight-city">
                <FaMapMarkerAlt className="icon" /> City: {hotel.city}
              </span> <br />
              <span className="highlight-rent">
                <FaDollarSign className="icon" /> Rent Per Night: ${hotel.rentPerNight}
              </span> <br />
              <span className="highlight-address">
                <FaHome className="icon" /> Address: {hotel.address}
              </span> <br />
              <span className="highlight-ratings">
                <FaStar className="icon" /> Ratings: {hotel.ratings} / 5
              </span> <br />
              <span className="highlight-contact">
                <FaPhoneAlt className="icon" /> Contact: {hotel.contactNumber}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels found.</p>
      )}

      {/* Booking History Section */}
      <h2 className="section-title">All Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <strong>User:</strong> {booking.username} - <strong>Hotel:</strong> {booking.hotelName} - <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;

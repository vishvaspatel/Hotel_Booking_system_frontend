import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaDollarSign, FaHome, FaStar, FaPhoneAlt } from 'react-icons/fa'; // Import icons
import './Home.css'; // Import the CSS file

function Home() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://hotel-booking-system-backend-xi.vercel.app/api/hotels'); // Fetch hotels from the backend
      setHotels(response.data); // Set the fetched hotels to state
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels(); // Fetch hotels when the component mounts
  }, []);

  const handleAdminLogin = () => {
    navigate('/admin-login'); // Navigate to the admin login page
  };

  const handleUserLogin = () => {
    navigate('/user-login'); // Navigate to the user login page
  };

  return (
    <div>
      <header>
        <h1 className="header-title">Welcome to the Hotel Booking System</h1>
        <div className="header-buttons"> {/* Flex container for buttons */}
          <button onClick={handleAdminLogin} className='homebut'>Admin Login</button>
          <button onClick={handleUserLogin} className='homebut'>User Sign In</button> {/* User Sign In Button */}
        </div>
      </header>

      <h2>Available Hotels</h2>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              <strong>Hotel Name: {hotel.name}</strong> <br />
              <span className="highlight-city">
                <FaMapMarkerAlt className="icon" /> City: {hotel.city}
              </span>
              <span className="highlight-rent">
                <FaDollarSign className="icon" /> Rent Per Night: ${hotel.rentPerNight}
              </span>
              <span className="highlight-address">
                <FaHome className="icon" /> Address: {hotel.address}
              </span>
              <span className="highlight-ratings">
                <FaStar className="icon" /> Ratings: {hotel.ratings} / 5
              </span>
              <span className="highlight-contact">
                <FaPhoneAlt className="icon" /> Contact: {hotel.contactNumber}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels available.</p>
      )}
    </div>
  );
}

export default Home;

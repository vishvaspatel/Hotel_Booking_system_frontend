import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaStar, FaPhoneAlt, FaHome } from 'react-icons/fa'; // Import icons
import "./UserPage.css"

function UserPage() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]); // State for booked hotels
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date
  const [hotelToBook, setHotelToBook] = useState(null); // State for hotel to book
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username from local storage

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('https://hotel-booking-system-backend-xi.vercel.app/api/hotels');
        setHotels(response.data);
      } catch (err) {
        setError('Failed to fetch hotels');
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`https://hotel-booking-system-backend-xi.vercel.app/api/bookings/${username}`);
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings');
      }
    };

    fetchHotels();
    fetchBookings(); // Fetch user's bookings
  }, [username]);

  const handleBookHotel = (hotel) => {
    setHotelToBook(hotel); // Set the selected hotel
    setSelectedDate(''); // Reset the selected date when booking a new hotel
    setIsModalOpen(true); // Open the modal
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Update the selected date
  };

  const confirmBooking = async () => {
    try {
      // Send booking request to the backend
      await axios.post('https://hotel-booking-system-backend-xi.vercel.app/api/bookings', {
        username,
        hotelId: hotelToBook._id,
        date: selectedDate,
      });
      alert(`Hotel ${hotelToBook.name} booked for ${selectedDate}!`);

      // Refresh bookings after successful booking
      const response = await axios.get(`https://hotel-booking-system-backend-xi.vercel.app/api/bookings/${username}`);
      setBookings(response.data);

      // Reset state
      setSelectedDate('');
      setHotelToBook(null);
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      setError('Failed to book hotel');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from local storage
    navigate('/user-login'); // Redirect to the login page
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setHotelToBook(null); // Reset the selected hotel
  };

  return (
    <div className="user-page-container">
      <h2>Welcome, {username}!</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      {error && <p className="error-message">{error}</p>}
      
      <h2 className="section-title">Available Hotels</h2>
      {hotels.length > 0 ? (
        <ul className="hotel-list">
          {hotels.map((hotel) => (
            <li key={hotel._id} className="hotel-item">
              <strong>Hotel Name: {hotel.name}</strong> <br />
              <span><FaMapMarkerAlt className="icon" /> City: {hotel.city}</span> <br />
              <span><FaDollarSign className="icon" /> Rent Per Night: ${hotel.rentPerNight}</span> <br />
              <span><FaHome className="icon" /> Address: {hotel.address}</span> <br />
              <span><FaStar className="icon" /> Ratings: {hotel.ratings} / 5</span> <br />
              <span><FaPhoneAlt className="icon" /> Contact: {hotel.contactNumber}</span> <br />
              <button className="book-button" onClick={() => handleBookHotel(hotel)}>Book Hotel</button> {/* Updated Button */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels available.</p>
      )}

      {/* Booking History */}
      <h2 className="section-title">Booking History</h2>
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              Hotel: {booking.hotelName} - Date: {new Date(booking.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Modal for Booking Confirmation */}
      {isModalOpen && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Booking {hotelToBook?.name}</h3>
            <label>
              Select Date:
              <input 
                type="date" 
                value={selectedDate} 
                onChange={handleDateChange} 
                required 
              />
            </label>
            <button onClick={confirmBooking} disabled={!selectedDate}>Confirm Booking</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles for Modal
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
};

export default UserPage;

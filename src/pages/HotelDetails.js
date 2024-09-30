import React from 'react';
import { useParams } from 'react-router-dom';

function HotelDetails() {
  const { id } = useParams();
  return (
    <div>
      <h1>Hotel Details for Hotel ID: {id}</h1>
      {/* Display hotel details here */}
    </div>
  );
}

export default HotelDetails;

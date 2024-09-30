import React from 'react';
import { useParams } from 'react-router-dom';

function Booking() {
  const { id } = useParams();
  return (
    <div>
      <h1>Booking for Hotel ID: {id}</h1>
      {/* Booking form will go here */}
    </div>
  );
}

export default Booking;

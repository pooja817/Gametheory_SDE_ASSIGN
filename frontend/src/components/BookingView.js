import React, { useState, useEffect } from "react";
import axios from "axios";

// Available sports for the dropdown
const sports = ["Badminton", "Squash", "Tennis"];

const BookingView = () => {
  const [sportName, setSportName] = useState(sports[0]); // Default to the first sport
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/bookings/view-bookings",
        {
          params: { sportName, date },
        }
      );

      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to fetch bookings.");
    }
  };

  return (
    <div>
      <h1>View Bookings</h1>
      <select value={sportName} onChange={(e) => setSportName(e.target.value)}>
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchBookings}>View Bookings</button>

      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.customerName} - {booking.timeSlot} (Court:{" "}
            {booking.court.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingView;

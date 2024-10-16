// components/BookingForm.js
import React, { useState } from "react";
import axios from "axios";

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const start = i % 12 === 0 ? 12 : i % 12;
  const end = (i + 1) % 12 === 0 ? 12 : (i + 1) % 12;
  const period = i < 12 ? "AM" : "PM";
  return `${start}${period} - ${end}${period}`;
});

const BookingForm = ({ onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [sportName, setSportName] = useState("Badminton");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableCourts, setAvailableCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For button state

  // Fetch available courts
  const fetchAvailableCourts = async () => {
    if (!date || !timeSlot) {
      alert("Please select a valid date and time slot.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3002/api/bookings/available-courts",
        { params: { sportName, date, timeSlot } }
      );
      setAvailableCourts(response.data);
      if (response.data.length === 0) {
        alert("No courts available for the selected time slot.");
      }
    } catch (error) {
      console.error("Error fetching available courts:", error);
      alert("Failed to fetch available courts.");
    }
  };

  // Create booking
  const handleCreateBooking = async () => {
    if (!customerName || !selectedCourt) {
      alert("Please enter a customer name and select a court.");
      return;
    }

    try {
      setIsSubmitting(true); // Disable button during submission
      await axios.post("http://localhost:3002/api/bookings", {
        customerName,
        sportName,
        date,
        timeSlot,
        courtId: selectedCourt,
      });
      alert("Booking created successfully!");
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Booking</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        value={sportName}
        onChange={(e) => setSportName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      >
        <option>Badminton</option>
        <option>Tennis</option>
        <option>Squash</option>
      </select>
      <select
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        {timeSlots.map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <button
        onClick={fetchAvailableCourts}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
      >
        Check Availability
      </button>
      {availableCourts.length > 0 && (
        <select
          value={selectedCourt}
          onChange={(e) => setSelectedCourt(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          {availableCourts.map((court) => (
            <option key={court._id} value={court._id}>
              {court.name}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={handleCreateBooking}
        className={`bg-green-500 text-white px-4 py-2 rounded w-full mt-4 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-400"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Booking..." : "Create Booking"}
      </button>
    </div>
  );
};

export default BookingForm;

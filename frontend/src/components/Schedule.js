// components/Schedule.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";

const courts = ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6"];

const Schedule = () => {
  const [bookings, setBookings] = useState([]);
  const [sport, setSport] = useState("Badminton");
  const [date, setDate] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (date) fetchBookings();
  }, [date, sport]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/bookings/view-bookings",
        { params: { sportName: sport, date } }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to fetch bookings.");
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  const getColorClass = (index) => {
    const colors = ["bg-green-200", "bg-red-200", "bg-blue-200", "bg-purple-200"];
    return colors[index % colors.length];
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-8">NEXUS</h1>
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer">
              Dashboard
            </li>
            <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer">
              Schedule
            </li>
            <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer">
              Customers
            </li>
            <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer">
              Attendance
            </li>
          </ul>
        </div>
        <p className="text-sm text-gray-400">© 2024 Nexus Sports</p>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-semibold">Schedule</h2>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md"
            onClick={() => setModalOpen(true)}
          >
            + New Booking
          </button>
        </header>

        <div className="flex items-center mb-4 space-x-4">
          <input
            type="date"
            className="border border-gray-300 rounded p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded p-2"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option>Badminton</option>
            <option>Tennis</option>
            <option>Squash</option>
          </select>
        </div>

        {/* Scrollable Grid Box */}
        <div className="border rounded-lg shadow-lg items-center overflow-hidden mb-6 w-fit max-w-5xl">
          <div
            className="overflow-x-auto overflow-y-auto"
            style={{ maxWidth: "1000px", maxHeight: "500px" }}
          >
            <div className="grid grid-cols-7 gap-4 min-w-[800px]">
              {/* Header Row: Courts */}
              <div className="font-bold text-center sticky top-0 bg-gray-100">
                Time
              </div>
              {courts.map((court, index) => (
                <div
                  key={index}
                  className="font-bold text-center sticky top-0 bg-gray-100"
                >
                  {court}
                </div>
              ))}

              {/* Time Slots and Bookings */}
              {Array.from({ length: 24 }, (_, hour) => (
                <React.Fragment key={hour}>
                  <div className="text-center font-semibold">
                    {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
                  </div>
                  {courts.map((court, index) => {
                    const booking = bookings.find(
                      (b) => b.court.name === court && b.timeSlot.includes(hour)
                    );
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded ${
                          booking ? getColorClass(index) : "bg-gray-100"
                        } shadow`}
                      >
                        {booking ? (
                          <p className="font-bold">{booking.customerName}</p>
                        ) : (
                          <p className="text-gray-400">Available</p>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* User Color Mapping */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">User Color Mapping</h3>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-200 rounded"></div>
              <span>Green - User 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-200 rounded"></div>
              <span>Red - User 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded"></div>
              <span>Blue - User 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-200 rounded"></div>
              <span>Purple - User 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-lg w-1/3 relative"
          >
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <BookingForm onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;

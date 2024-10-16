const express = require("express");
const {
  getAvailableCourts,
  createBooking,
  getCourtCount,
  getBookings,
} = require("../controllers/bookingController");
const router = express.Router();

// Route to get available courts
router.get("/available-courts", getAvailableCourts);

// Route to view bookings by sport name and date
router.get("/view-bookings", getBookings);

// Route to create a new booking
router.post("/", createBooking);

// Route to get the count of available courts
router.get('/court-count', getCourtCount);

module.exports = router;

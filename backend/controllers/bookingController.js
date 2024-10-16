const Booking = require("../models/Booking");
const Court = require("../models/Court");
const Sport = require("../models/Sport");


// Get available courts by sport name, date, and time slot
const getAvailableCourts = async (req, res) => {
  const { sportName, date, timeSlot } = req.query;

  try {
    // Validate date input
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Find the sport by name
    const sport = await Sport.findOne({ name: sportName });
    if (!sport) {
      return res.status(404).json({ message: "Sport not found." });
    }

    // Find all courts for the given sport
    const courts = await Court.find({ sport: sport._id }).select("_id name");

    // Find booked courts for the given date and time slot
    const bookedCourts = await Booking.find({
      date: parsedDate,
      timeSlot,
    }).select("court");

    // Filter out booked courts from the list
    const unavailableCourtIds = bookedCourts.map((b) => b.court.toString());
    const availableCourts = courts.filter(
      (court) => !unavailableCourtIds.includes(court._id.toString())
    );

    if (availableCourts.length === 0) {
      return res.status(404).json({ message: "No courts available for this time." });
    }

    res.json(availableCourts);
  } catch (error) {
    console.error("Error fetching available courts:", error);
    res.status(500).json({ error: "Failed to fetch available courts." });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  const { customerName, courtId, date, timeSlot } = req.body;

  try {
    // Ensure all required fields are present
    if (!customerName || !courtId || !date || !timeSlot) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the court is already booked for the selected time
    const existingBooking = await Booking.findOne({
      date: new Date(date),
      timeSlot,
      court: courtId,
    });

    if (existingBooking) {
      return res.status(400).json({ error: "This court is already booked." });
    }

    // Create a new booking
    const booking = new Booking({
      customerName,
      court: courtId,
      date: new Date(date),
      timeSlot,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking." });
  }
};



// Get bookings by sport name and date
const getBookings = async (req, res) => {
  const { sportName, date } = req.query;

  try {
    // Step 1: Find the sport by name
    const sport = await Sport.findOne({ name: sportName });
    if (!sport) {
      return res.status(404).json({ message: "Sport not found." });
    }

    // Step 2: Find courts for the sport
    const courts = await Court.find({ sport: sport._id }).select("_id");

    // Step 3: Find bookings for the selected date across these courts
    const bookings = await Booking.find({
      court: { $in: courts },
      date: new Date(date),
    }).populate("court");

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};

// Get the count of available courts for a sport and date
const getCourtCount = async (req, res) => {
  const { sportName, date } = req.query;

  try {
    // Find the sport by its name
    const sport = await Sport.findOne({ name: sportName });
    if (!sport) {
      return res.status(404).json({ message: "Sport not found." });
    }

    // Find all courts for the given sport
    const totalCourts = await Court.find({ sport: sport._id }).countDocuments();

    // Find courts that are already booked on the given date
    const bookedCourts = await Booking.find({
      date: new Date(date),
      court: { $in: await Court.find({ sport: sport._id }).select("_id") },
    }).countDocuments();

    const availableCourts = totalCourts - bookedCourts;

    res.json({ totalCourts, availableCourts });
  } catch (error) {
    console.error("Error fetching court count:", error);
    res.status(500).json({ error: "Failed to fetch court count." });
  }
};


module.exports = {
  getAvailableCourts,
  createBooking,
  getBookings,
  getCourtCount,
};

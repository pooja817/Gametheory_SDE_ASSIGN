const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  court: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // Ensure timeSlot is required
});

module.exports = mongoose.model("Booking", BookingSchema);

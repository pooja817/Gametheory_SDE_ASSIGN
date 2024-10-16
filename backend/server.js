const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Register the booking routes
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

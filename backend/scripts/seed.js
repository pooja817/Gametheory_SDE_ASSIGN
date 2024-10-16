const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Centre = require("../models/Centre");
const Sport = require("../models/Sport");
const Court = require("../models/Court");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const centresData = [
  { name: "Indiranagar Centre", location: "Indiranagar" },
  { name: "Koramangala Centre", location: "Koramangala" },
  { name: "Whitefield Centre", location: "Whitefield" },
  { name: "Hebbal Centre", location: "Hebbal" },
  { name: "Marathahalli Centre", location: "Marathahalli" },
];

const sportsData = [
  { name: "Badminton" },
  { name: "Squash" },
  { name: "Tennis" },
];

// Generate 5 courts for each sport with unique court numbers
const generateCourts = (sportId) => {
  const courts = [];
  for (let i = 1; i <= 5; i++) {
    courts.push({
      name: `Court ${i}`,
      courtNumber: i, // Assign unique court numbers
      sport: sportId,
    });
  }
  return courts;
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Centre.deleteMany();
    await Sport.deleteMany();
    await Court.deleteMany();
    console.log("Existing data cleared.");

    // Insert Centres
    const centres = await Centre.insertMany(centresData);
    console.log("Centres inserted:", centres);

    // Loop through each centre to insert sports and courts
    for (const centre of centres) {
      // Insert sports for each centre
      const sports = await Sport.insertMany(
        sportsData.map((sport) => ({ ...sport, centre: centre._id }))
      );
      console.log(`Sports inserted for ${centre.name}:`, sports);

      // Insert courts for each sport
      for (const sport of sports) {
        const courts = await Court.insertMany(generateCourts(sport._id));
        console.log(`Courts inserted for ${sport.name}:`, courts);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();

const mongoose = require("mongoose");

const CentreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sport" }],
});

module.exports = mongoose.model("Centre", CentreSchema);

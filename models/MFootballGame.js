const mongoose = require("mongoose");

// Model used to create game entries into the mfootballgames collection
const MFootballGameSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  homeAway: {
    type: String,
    required: true,
  },
  opponent: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
  },
});

module.exports = mongoose.model("mfootballGame", MFootballGameSchema);

const mongoose = require("mongoose");

const MFootballGameSchema = mongoose.Schema({
  date: {
    type: String,
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

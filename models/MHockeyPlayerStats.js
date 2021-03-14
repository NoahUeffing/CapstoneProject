const mongoose = require("mongoose");

// Model used to create player stats entries into the mhockeyplayerstats collection
const MHockeyPlayerStatsSchema = mongoose.Schema({
  Number: {
    type: Number,
    //required: true,
  },
  Player: {
    type: String,
    //required: true,
  },
  Year: {
    type: String,
  },
  Position: {
    type: String,
  },
  GP: {
    type: String,
  },
  Goals: {
    type: String,
  },
  Assists: {
    type: String,
  },
  PIM: {
    type: String,
  },
  Plus_Minus: {
    type: String,
  },
  PPG: {
    type: String,
  },
  SHG: {
    type: String,
  },
  ENG: {
    type: String,
  },
  GWG: {
    type: String,
  },
  GTG: {
    type: String,
  },
  Hat_Tricks: {
    type: String,
  },
  Shots: {
    type: String,
  },
  Points: {
    type: String,
  },
});

module.exports = mongoose.model("mhockeyPlayerStats", MHockeyPlayerStatsSchema);

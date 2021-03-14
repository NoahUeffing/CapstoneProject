const mongoose = require("mongoose");

// Model used to create goalie stats entries into the mhockeygoaliestats collection
const MHockeyGoalieStatsSchema = mongoose.Schema({
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
  GS: {
    type: String,
  },
  Min: {
    type: String,
  },
  GA: {
    type: String,
  },
  GAA: {
    type: String,
  },
  SV: {
    type: String,
  },
  SVPCT: {
    type: String,
  },
  WIN: {
    type: String,
  },
  LOSS: {
    type: String,
  },
  TIE: {
    type: String,
  },
  WINPCT: {
    type: String,
  },
});

module.exports = mongoose.model("mhockeyGoalieStats", MHockeyGoalieStatsSchema);

const mongoose = require("mongoose");

const MBasketShootingStatsSchema = mongoose.Schema({
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
  MPG: {
    type: String,
  },
  FG_G: {
    type: String,
  },
  PCT: {
    type: String,
  },
  THREE_PT_G: {
    type: String,
  },
  TP_PCT: {
    type: String,
  },
  FT_G: {
    type: String,
  },
  FTP: {
    type: String,
  },
  PPG: {
    type: String,
  },
});

module.exports = mongoose.model(
  "mbasketShootingStats",
  MBasketShootingStatsSchema
);

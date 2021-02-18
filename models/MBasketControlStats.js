const mongoose = require("mongoose");

const MBasketControlStatsSchema = mongoose.Schema({
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
  OFF_G: {
    type: String,
  },
  DEF_G: {
    type: String,
  },
  REB_G: {
    type: String,
  },
  PF_G: {
    type: String,
  },
  DQ_G: {
    type: String,
  },
  AST_G: {
    type: String,
  },
  TO_G: {
    type: String,
  },
  A_TO: {
    type: String,
  },
  STL_G: {
    type: String,
  },
  BLK_G: {
    type: String,
  },
});

module.exports = mongoose.model(
  "mbasketControlStats",
  MBasketControlStatsSchema
);

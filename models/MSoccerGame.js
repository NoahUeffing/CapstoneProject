const mongoose = require("mongoose");

const MSoccerGameSchema = mongoose.Schema({
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
  result: {
    type: String,
  },
});

module.exports = mongoose.model("msoccerGame", MSoccerGameSchema);

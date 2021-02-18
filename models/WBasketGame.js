const mongoose = require("mongoose");

const WBasketGameSchema = mongoose.Schema({
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
  score: {
    type: String,
  },
});

module.exports = mongoose.model("wbasketGame", WBasketGameSchema);

const mongoose = require("mongoose");

// Model used to create game entries into the mbasketgames collection
const MBasketGameSchema = mongoose.Schema({
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

module.exports = mongoose.model("mbasketGame", MBasketGameSchema);

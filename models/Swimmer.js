const mongoose = require("mongoose");

// Model used to create swimmer entries into the swimmers collection
const SwimmerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yr: {
    type: String,
  },
  club: {
    type: String,
  },
  town: {
    type: String,
  },
});

module.exports = mongoose.model("swimmer", SwimmerSchema);

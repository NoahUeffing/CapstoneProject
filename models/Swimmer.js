const mongoose = require("mongoose");

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

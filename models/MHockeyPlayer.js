const mongoose = require("mongoose");

// Model used to create player entries into the mhockeyplayers collection
const MHockeyPlayerSchema = mongoose.Schema({
  no: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  pos: {
    type: String,
  },
  yr: {
    type: String,
  },
  ht: {
    type: String,
  },
  major: {
    type: String,
  },
  town: {
    type: String,
  },
});

module.exports = mongoose.model("mhockeyPlayer", MHockeyPlayerSchema);

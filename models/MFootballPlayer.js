const mongoose = require("mongoose");

// Model used to create player entries into the mfootballplayers collection
const MFootballPlayerSchema = mongoose.Schema({
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
  wt: {
    type: String,
  },
  town: {
    type: String,
  },
});

module.exports = mongoose.model("mfootballPlayer", MFootballPlayerSchema);

const mongoose = require("mongoose");

const MFootballPlayerSchema = mongoose.Schema({
  no: {
    type: String,
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

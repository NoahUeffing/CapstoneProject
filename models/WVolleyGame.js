const mongoose = require("mongoose");

// Model used to create game entries into the wvolleygames collection
const WVolleyGameSchema = mongoose.Schema({
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

module.exports = mongoose.model("wvolleyGame", WVolleyGameSchema);

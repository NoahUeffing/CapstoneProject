const mongoose = require("mongoose");

const SwimmingEventSchema = mongoose.Schema({
  date: {
    type: Date,
    //required: true,
  },
  teams: {
    type: String,
    //required: true,
  },
  notes: {
    type: String,
  },
  event: {
    type: String,
    //required: true,
  },
  results: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("swimmingEvent", SwimmingEventSchema);

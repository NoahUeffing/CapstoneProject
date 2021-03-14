const mongoose = require("mongoose");

// Model used to create event entries into the swimmingevents collection
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

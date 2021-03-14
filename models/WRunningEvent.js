const mongoose = require("mongoose");

// Model used to create event entries into the wrunningevents collection
const WRunningEventSchema = mongoose.Schema({
  date: {
    type: Date,
    //required: true,
  },
  event: {
    type: String,
    required: true,
  },
  result: {
    type: String,
  },
  links: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("wrunningEvent", WRunningEventSchema);

const mongoose = require("mongoose");

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

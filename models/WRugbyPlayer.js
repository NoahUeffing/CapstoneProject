const mongoose = require("mongoose");

const WRugbyPlayerSchema = mongoose.Schema({
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
  town: {
    type: String,
  },
});

module.exports = mongoose.model("wrugbyPlayer", WRugbyPlayerSchema);

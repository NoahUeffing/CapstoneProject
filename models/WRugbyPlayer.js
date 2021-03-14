const mongoose = require("mongoose");

// Model used to create player entries into the wrugbyplayers collection
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

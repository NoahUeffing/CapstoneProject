const mongoose = require("mongoose");

// Model used to create player entries into the wsoccerplayers collection
const WSoccerPlayerSchema = mongoose.Schema({
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
  town: {
    type: String,
  },
});

module.exports = mongoose.model("wsoccerPlayer", WSoccerPlayerSchema);
